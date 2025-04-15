
const { pool, isProduction } = require('./dal');

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_ddTenST4kF9PAc6Old7PvQEm'); 
const { log, error } = require('../src/utils/logger');

// Make logger functions global
global.log = log;
global.error = error;

const { 
  getProducts, 
  getUserByEmail, 
  addUser,
  createOrder,
  getAllUsers,
  updateUserRole,
  getSalesReport,
  getProductsAdmin,
  addProduct
} = require('./dal');

// const pool = require('./dal').pool;
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const path = require('path');
const fs = require('fs');


const app = express();

// Enable CORS 
app.use(cors());

app.use(express.json());

// Secret key for signing JWT 
const JWORD = process.env.JWORD || 'sk_test_ddTenST4kF9PAc6Old7PvQEm';


// System health check endpoint
app.get('/api/system/status', (req, res) => {
  res.json({ status: 'System Online', timestamp: new Date().toISOString() });
});


// Login endpoint
app.post('/api/login', async (req, res) => {

  try {
  const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, name: user.name, email: user.email }, JWORD, { expiresIn: '1h' });

      // return user data and token on successful login
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token,
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch {
    res.status(500).json({ error: 'Login failed' });
  }
});


app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user to the database
    const userId = await addUser(name, email, hashedPassword);

    res.status(201).json({ message: 'Registration successful', userId });
  } catch {
    res.status(500).json({ error: 'Registration failed' });
  }
});



// products data from the database
app.get('/api/products', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/create-checkout-session', async (req, res) => {
  const { cart, userId } = req.body; // Get cart data, userId

  try {
    // items to send to Stripe
    const items = cart.map(item => ({
      price_data: {
        currency: 'gbp',  
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity,
    }));

    // total amount
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
    // Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`, 
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        userId: userId, 
        cart: JSON.stringify(cart), 
        totalAmount: totalAmount, 
      },
    });

    // session id to frontend
    res.json({ id: session.id });
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Create new sales order
app.post('/api/create-order', async (req, res) => {
  const { userId, cart, totalAmount, latitude, longitude } = req.body;
  try {
    const orderId = await createOrder(userId, totalAmount, cart, latitude, longitude);
    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// // create-order endpoint
// app.post('/api/create-order', async (req, res) => {
//   const { userId, cart, totalAmount, latitude, longitude } = req.body;
//   try {
//     const orderId = await createOrder(userId, totalAmount, cart, latitude, longitude);
//     res.status(201).json({ message: 'Order created successfully', orderId });
//   } catch {
//     res.status(500).json({ error: 'Failed to create order' });
//   }
// });

// Update user management endpoint
app.get('/api/admin/usermanagement', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update role management endpoint
app.put('/api/admin/usermanagement/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const affected = await updateUserRole(id, role);
    if (affected === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User role updated successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Update sales report endpoint
app.get('/api/admin/salesreport', async (req, res) => {
  try {
    const sales = await getSalesReport();
    res.json(sales);
  } catch  {
    res.status(500).json({ error: error.message || 'Failed to fetch sales data' });
  }
});




app.get('/verify-payment-session', async (req, res) => {
  const { session_id } = req.query;

  try {
    //session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === 'paid') {
      const { userId, cart, totalAmount } = session.metadata;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is missing in session metadata' });
      }

      // Save order in database
      // const result = await new Promise((resolve, reject) => {
      //   pool.query(
      //     'INSERT INTO sales_orders (user_id, total_amount, order_details) VALUES (?, ?, ?)',
      //     [userId, totalAmount, cart],
      //     (error, results) => {
      //       if (error) return reject(error);
      //       resolve(results);
      //     }
      //   );
      // });

      //Return success
      res.json({
        status: 'success',
        orderId: session_id, 
        // orderId: result.insertId,
        totalAmount: parseFloat(totalAmount),
        cart: JSON.parse(cart),
      });
    } else {
      res.json({ status: 'failed' });
    }
  } catch {
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});



// logo as Base64
app.get('/api/logo', (req, res) => {
  const logoPath = path.join(__dirname, '../public/images/logo.png'); 

  //Read file
  fs.readFile(logoPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load logo' });
    }

    // file buffer to Base64
    const base64Image = data.toString('base64');
    res.json({ logo: `data:image/png;base64,${base64Image}` });
  });
});




// Admin
// Get all users
app.get('/api/admin/usermanagement', async (req, res) => {
  try {
    const connection = await pool.promise();
    const [users] = await connection.query('SELECT id, name, email, role FROM users');
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user role
app.put('/api/admin/usermanagement/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  
  try {
    const connection = await pool.promise();
    const [result] = await connection.query(
      'UPDATE users SET role = ? WHERE id = ?',
      [role, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User role updated successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

app.get('/api/admin/salesreport', async (req, res) => {
  try {
    const connection = await pool.promise();
    const [sales] = await connection.query(`
      SELECT 
        so.id,
        so.user_id,
        u.name as user_name,
        so.total_amount,
        so.order_details,
        so.latitude,
        so.longitude,
        so.created_at
      FROM sales_orders so
      LEFT JOIN users u ON so.user_id = u.id
      ORDER BY so.created_at DESC
    `);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch sales data' });
  }
});

// Update the product management endpoints
app.get('/api/admin/productmanagement', async (req, res) => {
  try {
    const products = await getProductsAdmin();
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/admin/productmanagement', async (req, res) => {
  const { name, brand, price, image, specifications, rating } = req.body;
  try {
    const productId = await addProduct(name, brand, price, image, specifications, rating);
    res.status(201).json({
      message: 'Product added successfully',
      productId
    });
  } catch {
    res.status(500).json({ error: 'Failed to add product' });
  }
});


app.get('/api/technews', (req, res) => {
  const filePath = path.join(__dirname, '../public/data/tech-news.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load tech news' });
    }
    
    try {
      const newsData = JSON.parse(data);
      res.json(newsData.news);
    } catch {
      res.status(500).json({ error: 'Failed to parse tech news data' });
    }
  });
});




// Start the server
const PORT = isProduction ? (process.env.PORT || 3000) : 5000;
app.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});

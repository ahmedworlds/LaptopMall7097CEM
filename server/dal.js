
const mysql = require('mysql2/promise');
const { Pool: PgPool } = require('pg');

// Detect environment based on DATABASE_URL presence
const isProduction = process.env.DATABASE_URL ? true : false;

// Create connection based on environment detection
const pool = isProduction
  ? new PgPool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    })
  : mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'laptop_mall',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

// Helper function to handle different DB responses
const formatResults = (results) => {
  if (isProduction) {
    return results.rows;
  }
  return results[0];
};

// all products
async function getProducts() {
  const results = await pool.query('SELECT * FROM products');
  return formatResults(results);
}

// find a user by email
async function getUserByEmail(email) {
  const results = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  const formattedResults = formatResults(results);
  return formattedResults[0];
}

// add a new user
async function addUser(name, email, password) {
  if (process.env.NODE_ENV === 'production') {
    const results = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, password]
    );
    return results.rows[0].id;
  } else {
    const results = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return results[0].insertId;
  }
}

async function createOrder(userId, totalAmount, cart, latitude, longitude) {
  const query = isProduction
    ? 'INSERT INTO sales_orders (user_id, total_amount, order_details, latitude, longitude) VALUES ($1, $2, $3, $4, $5) RETURNING id'
    : 'INSERT INTO sales_orders (user_id, total_amount, order_details, latitude, longitude) VALUES (?, ?, ?, ?, ?)';
  
  const values = [userId, totalAmount, JSON.stringify(cart), latitude, longitude];
  const result = await pool.query(query, values);
  return isProduction ? result.rows[0].id : result[0].insertId;
}

async function getAllUsers() {
  const query = 'SELECT id, name, email, role FROM users';
  const result = await pool.query(query);
  return formatResults(result);
}

async function updateUserRole(id, role) {
  const query = isProduction
    ? 'UPDATE users SET role = $1 WHERE id = $2'
    : 'UPDATE users SET role = ? WHERE id = ?';
  
  const result = await pool.query(query, [role, id]);
  return isProduction ? result.rowCount : result[0].affectedRows;
}

async function getSalesReport() {
  const query = `
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
  `;
  const result = await pool.query(query);
  return formatResults(result);
}

// getProductsAdmin for admin product management
async function getProductsAdmin() {
  const query = 'SELECT * FROM products ORDER BY id';
  const result = await pool.query(query);
  return formatResults(result);
}

async function addProduct(name, brand, price, image, specifications, rating) {
  const query = isProduction
    ? 'INSERT INTO products (name, brand, price, image, specifications, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id'
    : 'INSERT INTO products (name, brand, price, image, specifications, rating) VALUES (?, ?, ?, ?, ?, ?)';
  
  const values = [name, brand, price, image, specifications, rating];
  const result = await pool.query(query, values);
  return isProduction ? result.rows[0].id : result[0].insertId;
}

module.exports = {
  pool,
  isProduction,
  getProducts,
  getUserByEmail,
  addUser,
  createOrder,
  getAllUsers,
  updateUserRole,
  getSalesReport,
  getProductsAdmin,
  addProduct
};
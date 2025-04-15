
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Products from './pages/Product';
import Dashboard from './private/Dashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import './App.css';
import AdminDashboard from './admin/AdminDashboard';
import TechNews from './pages/TechNews';

// Create Cart
export const CartContext = React.createContext();

const App = () => {
  // Initialize state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  //  cart panel
  const toggleCartPanel = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Router>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        <Header user={user} setUser={setUser} toggleCartPanel={toggleCartPanel} cart={cart} />
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart toggleCartPanel={toggleCartPanel} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/technews" element={<TechNews />} />

        </Routes>
        <Footer />

        {isCartOpen && (
          <div className="cart-panel">
            <button onClick={toggleCartPanel} className="close-cart">
              Close Cart
            </button>

            <Cart toggleCartPanel={toggleCartPanel} />
          </div>
        )}
      </CartContext.Provider>
    </Router>
  );
};

export default App;
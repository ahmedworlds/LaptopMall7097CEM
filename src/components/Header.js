import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import './Header.css';

// login & cart
const Header = ({ user, setUser, toggleCartPanel, cart }) => {
  const [logo, setLogo] = useState(null); // State to store the Base64 logo
  const navigate = useNavigate();

  // log in the user if a token exists in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !user) {
      try {
        const decodedToken = JSON.parse(atob(storedToken.split('.')[1])); 
        if (decodedToken.exp * 1000 > Date.now()) {
          // Token still valid
          setUser({ name: decodedToken.name, email: decodedToken.email });
        } else {
          // Token expired
          localStorage.removeItem('token');
        }
      } catch (error) {
        // log('Error decoding token:', error);
        localStorage.removeItem('token'); 
      }
    }
  }, [user, setUser]);

  // get the logo from the API
  useEffect(() => {
    fetch('/api/logo')
      .then((res) => res.json())
      .then((data) => {
        setLogo(data.logo); 
      })
      .catch(() => {
        // log('Error fetching logo:', error);
      });
  }, []);

  // Logout
  const handleLogout = () => {
    // clear user data
    setUser(null);
    // Clear token
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    // Navigate to home page
    navigate('/');
  };

  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="d-flex align-items-center gap-2">
          {logo && <img src={logo} alt="Laptop Mall Logo" style={{ height: '40px' }} />}
          <h1 className="mb-0">
            <Link to="/" className="text-white text-decoration-none">
              Laptop Mall
            </Link>
          </h1>
        </div>

        {/* Cart and User/Login Section */}
        <div className="d-flex align-items-center gap-3">
          {/* Cart Button */}
          <button onClick={toggleCartPanel} className="btn btn-outline-light">
            🛒 Cart ({cart.length})
          </button>

          {/* User Profile or Login */}
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <div
                className="profile-picture bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: '35px', height: '35px' }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <Link to="/dashboard" className="text-white text-decoration-none">
                {user.name || 'User'}
              </Link> 
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </div>
          ) : (
            <AuthModal setUser={setUser} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
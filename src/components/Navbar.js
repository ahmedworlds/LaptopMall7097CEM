import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// navigashun bar with user menu
const Navbar = ({ user }) => {
// const Navbar = ({ user, setUser }) => {
  return (
    <nav>
      <ul className="navbar-center">
        <li>
          <Link to="/"> 🏠 Home </Link>
        </li>
        <li>
          <Link to="/products"> 💻 Products </Link>
        </li>
        <li>
          <Link to="/services"> ⚡ Services </Link>
        </li>
        <li>
          <Link to="/technews"> 📰 Tech News </Link>
        </li>
        
        {user && <li><Link to="/dashboard">📊 Dashboard</Link></li>}


        {user && user.role === 'admin' && (
          <li className="admin-menu">
            <Link to="/admin">👑 Admin</Link>
          </li>
        )}

        <li>
          <Link to="/contact"> 📞 Contact </Link>
        </li>
        <li>
          <Link to="/about"> ℹ️ About </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
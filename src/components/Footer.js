import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="text-center py-4 bg-dark text-white">

      <p className="mb-3">&copy; 2025 Laptop Mall. All rights reserved.</p>

      {/* Social Media Icons */}
      <div className="social-icons">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white me-3"
        >
          <i className="bi bi-facebook"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white me-3"
        >
          <i className="bi bi-twitter"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white me-3"
        >
          <i className="bi bi-instagram"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          <i className="bi bi-linkedin"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
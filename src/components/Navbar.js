import React from 'react';
import './Navbar.css';

export default function Navbar({ currentPage, onPageChange, isDarkMode, onThemeToggle }) {
  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-left">
        <div className="navbar-brand">
          <h2>Todo App</h2>
        </div>
        <div className="navbar-links">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onPageChange('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => onPageChange('about')}
          >
            About
          </button>
        </div>
      </div>
      <div className="navbar-theme">
        <button 
          className="theme-toggle"
          onClick={onThemeToggle}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
} 
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    // Apply theme to body for global styling
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home isDarkMode={isDarkMode} />;
      case 'about':
        return <About isDarkMode={isDarkMode} />;
      default:
        return <Home isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <Navbar 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
      />
      <main className="main-content">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

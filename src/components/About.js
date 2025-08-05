import React from 'react';
import './About.css';

export default function About({ isDarkMode }) {
  return (
    <div className={`about ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="about-container">
        <h1>About Todo App</h1>
        
        <div className="about-content">
          <section className="about-section">
            <h2>Welcome to Your Personal Task Manager</h2>
            <p>
              This is a modern, feature-rich todo application designed to help you stay organized 
              and productive. Built with React and enhanced with a beautiful, responsive interface 
              that adapts to your preferences.
            </p>
          </section>

          <section className="about-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📝</div>
                <h3>Task Management</h3>
                <p>Create, edit, and organize your tasks with ease. Mark them as complete when done.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Priority Levels</h3>
                <p>Set priority levels (High, Medium, Low) to focus on what matters most.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Smart Filtering</h3>
                <p>Filter tasks by status (All, Active, Completed) and sort by priority, date, or alphabetically.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Progress Tracking</h3>
                <p>Track your progress with real-time statistics showing total, completed, and pending tasks.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🌙</div>
                <h3>Dark Mode</h3>
                <p>Switch between light and dark themes for comfortable viewing in any environment.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">💾</div>
                <h3>Data Persistence</h3>
                <p>Your tasks are automatically saved to localStorage, so they persist between sessions.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>How to Use</h2>
            <div className="usage-steps">
              <div className="step">
                <span className="step-number">1</span>
                <div>
                  <h4>Add Tasks</h4>
                  <p>Type your task in the input field and click "Add Task" or press Enter.</p>
                </div>
              </div>
              
              <div className="step">
                <span className="step-number">2</span>
                <div>
                  <h4>Set Priority</h4>
                  <p>Use the priority dropdown to mark tasks as High, Medium, or Low priority.</p>
                </div>
              </div>
              
              <div className="step">
                <span className="step-number">3</span>
                <div>
                  <h4>Mark Complete</h4>
                  <p>Check the checkbox next to a task to mark it as completed.</p>
                </div>
              </div>
              
              <div className="step">
                <span className="step-number">4</span>
                <div>
                  <h4>Organize</h4>
                  <p>Use the Up/Down arrows to reorder tasks or the Delete button to remove them.</p>
                </div>
              </div>
              
              <div className="step">
                <span className="step-number">5</span>
                <div>
                  <h4>Filter & Sort</h4>
                  <p>Use the filter and sort options to view tasks in different ways.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Technology Stack</h2>
            <div className="tech-stack">
              <div className="tech-item">
                <strong>Frontend:</strong> React.js
              </div>
              <div className="tech-item">
                <strong>Styling:</strong> CSS3 with Custom Properties
              </div>
              <div className="tech-item">
                <strong>State Management:</strong> React Hooks (useState, useEffect)
              </div>
              <div className="tech-item">
                <strong>Storage:</strong> LocalStorage API
              </div>
              <div className="tech-item">
                <strong>UI/UX:</strong> Responsive Design with Dark/Light Themes
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Get Started</h2>
            <p>
              Ready to boost your productivity? Head back to the Home page and start organizing 
              your tasks today! Remember, every great achievement starts with a simple to-do list.
            </p>
            <div className="cta-buttons">
              <button className="cta-primary">Start Managing Tasks</button>
              <button className="cta-secondary">Learn More</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 
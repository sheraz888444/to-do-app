import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import './Home.css';

export default function Home({ isDarkMode }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { 
        id: 1, 
        text: "eat breakfast", 
        completed: false, 
        priority: "medium",
        createdAt: new Date().toISOString(),
        addedAt: new Date().toISOString()
      },
      { 
        id: 2, 
        text: "take shower", 
        completed: false, 
        priority: "high",
        createdAt: new Date().toISOString(),
        addedAt: new Date().toISOString()
      },
      { 
        id: 3, 
        text: "play cricket", 
        completed: false, 
        priority: "low",
        createdAt: new Date().toISOString(),
        addedAt: new Date().toISOString()
      }
    ];
  });

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [sortBy, setSortBy] = useState("priority"); // priority, date, alphabetical
  const [searchDate, setSearchDate] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update current date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    
    const now = new Date();
    const newTaskObj = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      priority: "medium",
      createdAt: now.toISOString(),
      addedAt: now.toISOString()
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const updatePriority = (id, priority) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, priority } : task
    ));
  };

  const moveTask = (id, direction) => {
    const currentIndex = tasks.findIndex(task => task.id === id);
    if (direction === 'up' && currentIndex > 0) {
      const newTasks = [...tasks];
      [newTasks[currentIndex - 1], newTasks[currentIndex]] = [newTasks[currentIndex], newTasks[currentIndex - 1]];
      setTasks(newTasks);
    } else if (direction === 'down' && currentIndex < tasks.length - 1) {
      const newTasks = [...tasks];
      [newTasks[currentIndex + 1], newTasks[currentIndex]] = [newTasks[currentIndex], newTasks[currentIndex + 1]];
      setTasks(newTasks);
    }
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    // Filter by date if search date is set
    if (searchDate) {
      const searchDateObj = new Date(searchDate);
      const searchDateString = searchDateObj.toDateString();
      
      filtered = filtered.filter(task => {
        const taskDate = new Date(task.addedAt);
        return taskDate.toDateString() === searchDateString;
      });
    } else {
      // Filter by status only if no date search
      if (filter === "active") {
        filtered = filtered.filter(task => !task.completed);
      } else if (filter === "completed") {
        filtered = filtered.filter(task => task.completed);
      }
    }

    // Sort tasks
    switch (sortBy) {
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case "date":
        filtered.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        break;
      default:
        break;
    }

    return filtered;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#e74c3c";
      case "medium": return "#f39c12";
      case "low": return "#27ae60";
      default: return "#95a5a6";
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  const clearDateSearch = () => {
    setSearchDate("");
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className={`home ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="todo-container">
        <h1>My Todo List</h1>
        
        {/* Current Date and Time */}
        <div className="current-datetime">
          <div className="datetime-display">
            <span className="date">{currentDateTime.toLocaleDateString()}</span>
            <span className="time">{currentDateTime.toLocaleTimeString()}</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="stats">
          <span>Total: {totalCount}</span>
          <span>Completed: {completedCount}</span>
          <span>Pending: {totalCount - completedCount}</span>
        </div>

        {/* Add Task Section */}
        <div className="add-task-section">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button className="add-btn" onClick={addTask}>Add Task</button>
        </div>

        {/* Search by Date */}
        <div className="date-search-section">
          <div className="search-controls">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="date-input"
            />
            <button 
              className="search-btn"
              onClick={() => setSearchDate(searchDate)}
            >
              Search by Date
            </button>
            {searchDate && (
              <button 
                className="clear-search-btn"
                onClick={clearDateSearch}
              >
                Clear Search
              </button>
            )}
          </div>
          {searchDate && (
            <div className="search-info">
              Showing tasks for: {new Date(searchDate).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Filters */}
        {!searchDate && (
          <div className="filters">
            <div className="filter-group">
              <label>Filter:</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Tasks</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="date">Date Created</option>
              </select>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="task-list">
          {getFilteredTasks().map((task, index) => (
            <div 
              key={task.id} 
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <div className="task-details">
                  <span className="task-text">{task.text}</span>
                  <div className="task-meta">
                    <span className="task-date">Added: {formatDate(task.addedAt)}</span>
                    <span className="task-time">Time: {formatTime(task.addedAt)}</span>
                  </div>
                </div>
                <div 
                  className="priority-indicator"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                />
              </div>
              
              <div className="task-actions">
                <select
                  value={task.priority}
                  onChange={(e) => updatePriority(task.id, e.target.value)}
                  className="priority-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                
                <button 
                  className="move-btn up"
                  onClick={() => moveTask(task.id, 'up')}
                  disabled={index === 0}
                >
                  ↑
                </button>
                <button 
                  className="move-btn down"
                  onClick={() => moveTask(task.id, 'down')}
                  disabled={index === getFilteredTasks().length - 1}
                >
                  ↓
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {getFilteredTasks().length === 0 && (
          <div className="empty-state">
            {searchDate 
              ? `No tasks found for ${new Date(searchDate).toLocaleDateString()}` 
              : filter === "all" 
                ? "No tasks yet. Add one above!" 
                : `No ${filter} tasks.`
            }
          </div>
        )}
      </div>
    </div>
  );
} 
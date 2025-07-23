import React, { useState } from 'react';
import './App.css'; 
export default function TodoList() {
  // ✅ Fix 1: useState returns [state, setState]
  const [task, setTask] = useState([
    "eat breakfast",
    "take shower",
    "play cricket"
  ]);

  const [newtask, setnewTask] = useState("");

  function handleinputchange(event) {
    setnewTask(event.target.value);
  }

  function addTask() {
    if (newtask.trim() === "") return;
    setTask([...task, newtask]);
    setnewTask("");
  }

  function deleteTask(index) {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);
  }

  function Movetaskup(index) {
    if (index === 0) return;
    const updatedTasks = [...task];
    [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
    setTask(updatedTasks);
  }

  function Movetaskdown(index) {
    if (index === task.length - 1) return;
    const updatedTasks = [...task];
    [updatedTasks[index + 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index + 1]];
    setTask(updatedTasks);
  }

  return (
    <div className='to-do-list'>
      <h1>To Do List</h1>
      <div>
        {/* ✅ Fix 2: Use `onChange` not `onchange`, and `onClick` not `onclick` */}
        <input
          type="text"
          placeholder='Enter any task...'
          value={newtask}
          onChange={handleinputchange}
        />
        <button className='add-task' onClick={addTask}>Add</button>
      </div>
      <ol>
  {task.map((task, index) => (
    <li key={index}>
      <span className='number'>{index + 1}.</span>
      <span className='text'>{task}</span>

            <button className='delete-btn' onClick={() => deleteTask(index)}>Delete</button>
            <button className='task-up' onClick={() => Movetaskup(index)}>Up</button>
            <button className='task-down' onClick={() => Movetaskdown(index)}>Down</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

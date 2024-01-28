import React, { useState } from 'react';
import './App.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [combinedInput, setCombinedInput] = useState('');

  const addTodo = () => {
    const [newTodo, dueDate] = combinedInput.split('|');

    if (newTodo.trim() !== '' && dueDate) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false, dueDate: dueDate },
      ]);
      setCombinedInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <div className="content-container">
        <h1 className="gradient-text">Hello👋👋</h1><br />
        <h1 className="gradient-text">Add your tasks!!</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Add your work and time to do it"
            value={combinedInput}
            onChange={(e) => setCombinedInput(e.target.value)}
          />
          <i className="fas fa-calendar-alt" onClick={() => document.getElementById('date-input').focus()}></i>
          <input
            id="date-input"
            type="datetime-local"
            value={combinedInput.split('|')[1] || ''}
            onChange={(e) => setCombinedInput(`${combinedInput.split('|')[0]}|${e.target.value}`)}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ol>
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <div className="todo-item">
                <span
                  onClick={() => toggleTodo(todo.id)}
                  className={todo.completed ? 'completed-text' : ''}
                >
                  {todo.text}
                </span>
                <span>{todo.dueDate}</span>
              </div>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TodoApp;

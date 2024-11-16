import React, { useState, useEffect } from 'react';
import './styles.css';
import TodoItem from './todoitem';
import Popup from './popup';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addToDo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
      setShowPopup(true);
      setPopupMessage("¡Item agregado exitosamente!");
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
    setShowPopup(true);
    setPopupMessage("¡Item eliminado exitosamente!");
  };

  const deleteCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    if (completedTodos.length === 0) {
      setShowPopup(true);
      setPopupMessage("No hay tareas completadas para eliminar.");
    } else {
      const newTodos = todos.filter(todo => !todo.completed);
      setTodos(newTodos);
      setShowPopup(true);
      setPopupMessage("¡Tareas completadas eliminadas exitosamente!");
    }
  };

  const deleteAll = () => {
    if (todos.length === 0) {
      setShowPopup(true);
      setPopupMessage("La lista está vacía.");
    } else {
      setTodos([]);
      setShowPopup(true);
      setPopupMessage("¡Todos los ítems fueron eliminados exitosamente!");
    }
  };

  return (
    <div className="app">
      <h1>Lista de Quehaceres</h1>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nuevo quehacer..."
        />
        <button onClick={addToDo}>Crear Quehacer</button>
      </div>

      {showPopup && (
        <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}

      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            toggleComplete={() => toggleComplete(index)}
            deleteTodo={() => deleteTodo(index)}
          />
        ))}
      </ul>

      <div className="delete-buttons">
        <button onClick={deleteCompleted}>Eliminar Completados</button>
        <button onClick={deleteAll}>Eliminar Todos</button>
      </div>
    </div>
  );
}

export default App;
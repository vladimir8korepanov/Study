// App.js
import { useState, useCallback } from 'react';
import TodoItem from './TodoItem';


function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Fix performance', completed: false },
  ]);
  const [input, setInput] = useState('');

  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  },[]); //зависимостей нет, так как использую зхдесь функциональное обновление

  const getToggleHandler = useCallback(
    (id) => () => toggleTodo(id),
    [toggleTodo]
  );

  const addTodo = useCallback(() => {
    setTodos(prev => [...prev, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  }, [input]); //для передачи как пропс

  return (
    <div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onClick={getToggleHandler(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App; 
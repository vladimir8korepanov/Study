import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import * as todosApi from "../api/todosApi";

export default function TodoListWithApi() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      todosApi.getTodos().then((data) => {
        // data — массив, если нет — устанавливаем пустой массив
        setTodos(Array.isArray(data) ? data : []);
      }).catch((error) => {
        console.error('Error fetching todos:', error);
        setTodos([]);
      });
    }, []);

    const onToggle = async (id) => {
        const todo = todos.find((t) => t.id === id);
        const updatedTodo = await todosApi.updateTodo(id, {
          completed: !todo.completed,
        });
        setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
      };
    
      const onDelete = async (id) => {
        await todosApi.deleteTodo(id);
        setTodos(todos.filter((t) => t.id !== id));
      };
    
      return <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />;
}

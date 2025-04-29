import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete }) {
  if (!Array.isArray(todos)) {
    return <div data-testid="empty-list">No todos found</div>;
  }

  if (todos.length === 0) {
    return <div data-testid="empty-list">No todos found</div>;
  }

  return (
    <div className="todo-list" data-testid="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}  
        />
      ))}
      {/* {todos.length === 0 && <div data-testid="empty-list">No todos found</div>} */}
    </div>
  );
}
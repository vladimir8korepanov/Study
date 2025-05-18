import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import TodoList from './TodoList';
import TodoItem from './TodoItem';

function TestTodoListWrapper({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  const onToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />;
}

describe('TodoList and TodoItem Integration', () => {
  const initialTodos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write tests', completed: true },
  ];

  afterEach(() => {
    cleanup();
  });

  test('Рендерит список задач', () => {
    render(<TestTodoListWrapper initialTodos={initialTodos} />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByTestId('todo-container-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-container-2')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-1')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-2')).toBeChecked();
  });

  test('Переключает статус задачи при клике по чекбоксу', async () => {
    render(<TestTodoListWrapper initialTodos={initialTodos} />);
    const checkbox = screen.getByTestId('toggle-1');
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByTestId('todo-container-1')).toHaveClass('completed');
  });

  test('Удаляет задачу при клике по кнопке удаления', async () => {
    render(<TestTodoListWrapper initialTodos={initialTodos} />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('delete-1'));
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  test('Отображает сообщение при пустом списке задач', () => {
    render(<TestTodoListWrapper initialTodos={[]} />);
    expect(screen.getByTestId('empty-list')).toHaveTextContent('No todos found');
    expect(screen.queryByTestId('todo-list')).not.toBeInTheDocument();
  });
});
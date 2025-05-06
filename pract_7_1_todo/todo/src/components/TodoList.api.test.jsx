import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoListWithApi from './TodoListWithApi';
import { server } from '../mocks/server';
import * as todosApiMock from '../api/todosApiMock';
import { http } from 'msw'; 

// мокаем todosApi.js через todosApiMock.js
jest.mock('../api/todosApi', () => ({ 
    ...jest.requireActual('../api/todosApiMock'),
}));

// Настрокйка сервера MSW
beforeAll(() => {
    server.listen();
  // Логируем, что MSW запущен
  console.log('MSW server started');
  // Подписываемся на запросы для отладки
  server.events.on('request:start', ({ request }) => {
    console.log('MSW intercepted:', request.method, request.url);
  });
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('TodoList API Integration', () => {
  test('Получает и отображает список задач из API', async () => {
    render(<TodoListWithApi />);
    await waitFor(() => {
      expect(screen.getByText('Mocked todo 1')).toBeInTheDocument();
      expect(screen.getByText('Mocked todo 2')).toBeInTheDocument();
      expect(screen.getByTestId('todo-container-1')).toBeInTheDocument();
      expect(screen.getByTestId('todo-container-2')).toBeInTheDocument();
    });
  });

  test('Переключает статус задачи через API', async () => {
    render(<TodoListWithApi />);
    await waitFor(() => screen.getByTestId('toggle-1'));
    const checkbox = screen.getByTestId('toggle-1');
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox).toBeChecked();
      expect(screen.getByTestId('todo-container-1')).toHaveClass('completed');
    });
  });

  test('Удаляет задачу через API', async () => {
    render(<TodoListWithApi />);
    await waitFor(() => screen.getByText('Mocked todo 1'));
    await userEvent.click(screen.getByTestId('delete-1'));
    await waitFor(() => {
      expect(screen.queryByText('Mocked todo 1')).not.toBeInTheDocument();
      expect(screen.getByText('Mocked todo 2')).toBeInTheDocument();
    });
  });

  test('Отображает пустой список, если API возвращает пустой массив', async () => {
    server.use(
      http.get('https://api.example.com/todos', () => {
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
    render(<TodoListWithApi />);
    await waitFor(() => {
      expect(screen.getByTestId('empty-list')).toHaveTextContent('No todos found');
    });
  });
});
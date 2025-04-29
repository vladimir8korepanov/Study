import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "./TodoItem";

describe("TodoItem", () => {
  const todo = { id: 1, text: "Тестирование, юнит", completed: false };
  const onToggle = jest.fn();
  const onDelete = jest.fn();

  afterEach(() => {
    cleanup();
  });

  test("Отображает текст задания", () => {
    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />);
    screen.debug(); // Выводит DOM в консоль
    expect(screen.getByTestId(`todo-text-${todo.id}`)).toHaveTextContent(todo.text);
  });

  test("Отображает статус задачи (не выполнена)", () => {
    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />);
    expect(screen.getByTestId(`toggle-${todo.id}`)).not.toBeChecked();
  });

  test("Вызывает onToggle при клике по чекбоксу", async () => {
    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />);
    await userEvent.click(screen.getByTestId(`toggle-${todo.id}`));
    expect(onToggle).toHaveBeenCalledWith(todo.id);
  });

  test("Вызывает onDelete при клике по кнопке удаления", async () => {
    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />);
    await userEvent.click(screen.getByTestId(`delete-${todo.id}`));
    expect(onDelete).toHaveBeenCalledWith(todo.id);
  });

  test("Отображает статус задачи (выполнена)", () => {
    render(<TodoItem todo={{ ...todo, completed: true }} onToggle={onToggle} onDelete={onDelete} />);
    expect(screen.getByTestId(`toggle-${todo.id}`)).toBeChecked();
    expect(screen.getByTestId(`todo-container-${todo.id}`)).toHaveClass("completed");
  });
});
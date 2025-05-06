import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTodo from "./AddTodo";

describe("AddTodo", () => {
  const onAdd = jest.fn();

  beforeEach(() => {
    render(<AddTodo onAdd={onAdd} />);
  });

  test("Позволяет вводить текст задачи", async () => {
    const input = screen.getByTestId("new-todo-input");
    await userEvent.type(input, "Новая задача");

    expect(input).toHaveValue("Новая задача");
  });

  test("Добавляет задачу при отправке формы", async () => {
    const input = screen.getByTestId("new-todo-input");
    const button = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Сделать тесты");
    await userEvent.click(button);

    expect(onAdd).toHaveBeenCalledWith("Сделать тесты");
  });

  test("Очищает поле после отправки формы", async () => {
    const input = screen.getByTestId("new-todo-input");
    const button = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Проверить очистку");
    await userEvent.click(button);

    expect(input).toHaveValue("");
  });
});
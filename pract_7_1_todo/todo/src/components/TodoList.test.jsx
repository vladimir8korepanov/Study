import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "./TodoList";

describe("TodoList интеграция", () => {
    const todos = [
        { id: 1, text: "Действие 1", completed: false },
        { id: 2, text: "Действие 2", completed: true },
    ];
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    beforeEach(() => {
        render(<TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />);
    });

    test("Отображает список задач", () => {
        expect(screen.getByText("Действие 1")).toBeInTheDocument();
        expect(screen.getByText("Действие 2")).toBeInTheDocument();
    });

    test("Вызывает onToggle при клике по чекбоксу задачи", async () => {
        const checkbox = screen.getByTestId("toggle-1");
        await userEvent.click(checkbox);

        expect(onToggle).toHaveBeenCalledWith(1);
    });

    test("Вызывает onDelete при клике по кнопке удаления задачи", async () => {
        const deleteButton = screen.getByTestId("delete-2");
        await userEvent.click(deleteButton);

        expect(onDelete).toHaveBeenCalledWith(2);
    });

    test("Отмеченные задачи показываются как выполенные", () => {
        const completedCheckbox = screen.getByTestId("toggle-2");
        expect(completedCheckbox).toBeChecked();
    });
});
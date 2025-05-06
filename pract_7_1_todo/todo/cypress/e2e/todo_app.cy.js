// describe("Todo App E2E", () => {
//     beforeEach(() => {
//         cy.visit("/");
//     });

//     it("Добавление новой задачи", () => {
//         cy.get('[data-testid="new-todo-input"]').type("Действие 1");
//         cy.get('[data-testid="add-todo-button"]').click();
//         cy.contains("Действие 1").should("be.visible");
//     });

//     it("Удаление задачи", () => {
//         //Сначала добавляем задачу
//         cy.get('[data-testid="new-todo-input"]').type("Действие - удалить");
//         cy.get('[data-testid="add-todo-button"]').click();
//         cy.contains("Действие - удаление").should("be.visible");

//         //Удаляем
//         cy.get('[data-testid="todo-item"]').contains("Удалить")
//             .parent()
//             .find('[data-testid="delete-button"]')
//             .click();

//         //Проверка, что задачи больше нет
//         cy.contains("Удалить").should("not.exist");
//     });

//     it("Фильтрация задач(покажет только выполненые)", () => {
//         //Добавляем две задачи
//         cy.get('[data-testid="new-todo-input"]').type("Выполненная задача");
//         cy.get('[data-testid="add-todo-button"]').click();
//         cy.get('[data-testid="new-todo-input"]').type("Невыполненная задача");
//         cy.get('[data-testid="add-todo-button"]').click();

//         // Кликаем на фильтр "Выполненные"
//         cy.get('[data-testid="filter-completed"]').click();

//         // Проверяем: видим только выполненую задачу
//         cy.contains("Выполненная задача").should("be.visible");
//         cy.contains("Невыполненная задача").should("not.exist");
//     });
// });
describe("Todo App E2E", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
  });

  it("Добавление новой задачи", () => {
    const taskText = "Действие 1";
    cy.get('[data-testid="new-todo-input"]').type(taskText);
    cy.get('[data-testid="add-todo-button"]').click();
    cy.contains('[data-testid^="todo-text-"]', taskText).should("exist");
  });

  it("Удаление задачи", () => {
    const taskText = "Задача для удаления";
    // Добавляем задачу
    cy.get('[data-testid="new-todo-input"]').type(taskText);
    cy.get('[data-testid="add-todo-button"]').click();
    
    // Находим конкретную задачу по тексту и удаляем её
    cy.contains('[data-testid^="todo-text-"]', taskText)
      .parent()
      .find('[data-testid^="delete-"]')
      .click();
    
    // Проверяем, что задачи больше нет
    cy.contains('[data-testid^="todo-text-"]', taskText).should("not.exist");
  });

  it("Фильтрация задач (показывает только выполненные)", () => {
    const completedTask = "Выполненная задача";
    const activeTask = "Невыполненная задача";

    // Добавляем первую задачу
    cy.get('[data-testid="new-todo-input"]').type(completedTask);
    cy.get('[data-testid="add-todo-button"]').click();
    
    // Добавляем вторую задачу
    cy.get('[data-testid="new-todo-input"]').type(activeTask);
    cy.get('[data-testid="add-todo-button"]').click();

    // Отмечаем первую задачу как выполненную
    cy.contains('[data-testid^="todo-text-"]', completedTask)
      .parent()
      .find('[data-testid^="toggle-"]')
      .click();

    // Включаем фильтр "Выполненные"
    cy.get('[data-testid="filter-completed"]').click();

    // Проверяем отфильтрованный список
    cy.contains('[data-testid^="todo-text-"]', completedTask).should("exist");
    cy.contains('[data-testid^="todo-text-"]', activeTask).should("not.exist");
  });
});
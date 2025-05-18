// import { http } from "msw";

// let todos = [
//   { id: 1, text: "Mocked todo 1", completed: false },
//   { id: 2, text: "Mocked todo 2", completed: true },
// ];

// export const handlers = [
//   // Получить все todos
//   http.get("https://api.example.com/todos", () => {
//     return res(
//       ctx.delay(100),
//       ctx.status(200),
//       ctx.json(todos),
//     );
//   }),

//   // Добавить новый todo
//   http.post("https://api.example.com/todos", async (req, res, ctx) => {
//     const { text } = await req.json();
//     const newTodo = { id: Date.now(), text, completed: false };
//     todos.push(newTodo);
//     return res(
//       ctx.delay(100),
//       ctx.status(201),
//       ctx.json(newTodo)
//     );
//   }),

//   // Обновить существующий todo
//   http.patch("https://api.example.com/todos/:id", async (req, res, ctx) => {
//     const { id } = req.params;
//     const updates = await req.json();
//     const index = todos.findIndex((todo) => todo.id === Number(id));
//     if (index === -1) {
//       return res(
//         ctx.status(404),
//         ctx.json({ error: "Todo not found" })
//       );
//     }
//     todos[index] = { ...todos[index], ...updates };
//     return res(
//       ctx.delay(100),
//       ctx.status(200),
//       ctx.json(todos[index])
//     );
//   }),

//   // Удалить todo
//   http.delete("https://api.example.com/todos/:id", (req, res, ctx) => {
//     const { id } = req.params;
//     todos = todos.filter((todo) => todo.id !== Number(id));
//     return res(
//       ctx.delay(100),
//       ctx.status(204)
//     );
//   }),
// ];
import { http } from 'msw';

let todos = [
  { id: 1, text: 'Mocked todo 1', completed: false },
  { id: 2, text: 'Mocked todo 2', completed: true },
];

export const handlers = [
  http.get('https://api.example.com/todos', () => {
    return new Response(JSON.stringify(todos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      delay: 100,
    });
  }),
  http.post('https://api.example.com/todos', async ({ request }) => {
    const { text } = await request.json();
    const newTodo = { id: Date.now(), text, completed: false };
    todos.push(newTodo);
    return new Response(JSON.stringify(newTodo), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
      delay: 100,
    });
  }),
  http.patch('https://api.example.com/todos/:id', async ({ request, params }) => {
    const { id } = params;
    const updates = await request.json();
    const index = todos.findIndex((todo) => todo.id === Number(id));
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Todo not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    todos[index] = { ...todos[index], ...updates };
    return new Response(JSON.stringify(todos[index]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      delay: 100,
    });
  }),
  http.delete('https://api.example.com/todos/:id', ({ params }) => {
    const { id } = params;
    todos = todos.filter((todo) => todo.id !== Number(id));
    return new Response(null, {
      status: 204,
      delay: 100,
    });
  }),
];
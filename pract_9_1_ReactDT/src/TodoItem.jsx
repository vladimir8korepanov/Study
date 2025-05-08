import { memo, useMemo } from "react";

const TodoItem = memo(({ text, completed, onClick }) => {
  // Simulate expensive rendering/мемоизация тяжелых вычислений
  const heavyComputationResult = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 10000; i++) sum += i;
    return sum;
  },[]); //пустые зависимости, так как не зависит от пропсов 

  // heavyComputation();

  return (
    <li
      onClick={onClick}
      style={{ textDecoration: completed ? 'line-through' : 'none' }}
    >
      {text} (Computed: {heavyComputationResult})
    </li>
  );
});

export default TodoItem;
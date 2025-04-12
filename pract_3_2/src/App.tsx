import Card from "./components/Card";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card 
        title="Пример карточки"
        content="Пример карточки, созданный с помощью Tailwind CSS и кнопки с использованием стилизации Emotion."
      />
    </div>
  )
}

export default App;
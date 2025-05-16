import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import YandexLoginButton from './YandexLoginButton/YandexLoginButton';
import Callback from './Callback/Callback';

//интерфейс для данных пользователя (структура объекта user из localStorage)
interface User {
  id: string; 
  login: string; 
  first_name: string; 
  last_name?: string; 
  default_email: string; 
  [key: string]: unknown; 
}


const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    //получаем данные пользователя из localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      //парсим JSON и сохраняем в состояние
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <div>
              <h1>Добро пожаловать, {user.first_name}!</h1>
              <button
                onClick={() => {
                  localStorage.clear();
                  setUser(null);
                }}
              >
                Выйти
              </button>
            </div>
          ) : (
            <YandexLoginButton />
          )
        }
      />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
};

export default App;
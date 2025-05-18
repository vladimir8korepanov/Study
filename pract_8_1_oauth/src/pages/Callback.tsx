import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const Callback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const hash = window.location.hash;
    // const params = new URLSearchParams(hash.slice(1));
    const token = new URLSearchParams(hash.slice(1)).get('access_token');

    if (token) {
      login(token); // Сохраняем токен и логиним пользователя
    } else {
      navigate('/login'); // Если токена нет — возвращаем на вход
    }
  }, [login, navigate]);

  return <div>Обработка входа...</div>;
};

export default Callback;

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (code) {
        try {
          const res = await axios.post('/auth/yandex', { code }); //относительный URL 
          // Сохраняем токен и данные пользователя
          localStorage.setItem('token', res.data.access_token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          navigate('/');
        } catch (err) {
          console.error('Ошибка авторизации:', err);
        }
      }
    };

    fetchToken();
  }, [location, navigate]);

  return <div>Авторизация...</div>;
};

export default Callback;
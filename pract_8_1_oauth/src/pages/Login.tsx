import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const clientId = 'VITE_YANDEX_CLIENT_ID';
  const redirectUri = encodeURIComponent('https://localhost:5173/callback');
  const authUrl = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    
    if (token) {
      localStorage.setItem('yandex_token', token);
      navigate('/', { replace: true }); // Используем replace для предотвращения моргания
      return;
    }

    // Обработка ошибок
    const error = params.get('error');
    if (error) {
      console.error('Ошибка авторизации:', error);
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <h2>Авторизация через Яндекс</h2>
      <a href={authUrl} className="yandex-login-btn">
        Войти с Яндекс ID
      </a>
    </div>
  );
};

export default Login;
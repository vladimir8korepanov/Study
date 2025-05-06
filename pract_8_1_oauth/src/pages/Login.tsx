// import React, { useEffect, useRef } from 'react';

// const Login: React.FC = () => {
//   const clientId = import.meta.env.VITE_YANDEX_CLIENT_ID;
//   const redirectUri = import.meta.env.VITE_REDIRECT_URI;

//   // Отладка: логируем значения, чтобы проверить, что они загружаются
//   console.log('VITE_YANDEX_CLIENT_ID:', clientId);
//   console.log('VITE_REDIRECT_URI:', redirectUri);

//   const yandexAuthUrl = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;

//   return (
//     <div>
//       <h1>Войти через Яндекс</h1>
//       <a href={yandexAuthUrl} onClick={() => console.log('Clicked Yandex login')}>
//         Войти
//       </a>
//     </div>
//   );
// };

// export default Login;
// Login.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const clientId = 'ef65f055cb1b4a15ae31f33a652e8d8f';
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
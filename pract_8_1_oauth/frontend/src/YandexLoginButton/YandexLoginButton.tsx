const YandexLoginButton = () => {
  const clientId = import.meta.env.VITE_YANDEX_CLIENT_ID;
  const redirectUri = 'http://localhost:5173/callback';

  const handleLogin = () => {
    const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return <button onClick={handleLogin}>Войти с помощью Яндекс</button>;
};

export default YandexLoginButton;

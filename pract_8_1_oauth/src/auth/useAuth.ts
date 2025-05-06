import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const login = (token: string) => {
    localStorage.setItem('yandex_token', token);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('yandex_token');
    navigate('/login');
  };

  return { login, logout };
};
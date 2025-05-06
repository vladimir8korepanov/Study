import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';


const App = () => {
  const isAuthenticated = !!localStorage.getItem('yandex_token');

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/callback" element={<Login />} />

    </Routes>
  );
};

export default App;
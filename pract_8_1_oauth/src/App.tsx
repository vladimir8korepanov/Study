// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Callback from './pages/Callback';
// import HomePage from './pages/HomePage';
// import { useAuth } from './auth/useAuth';

// const App = () => {
//   const { user } = useAuth();

//   return (
//     <Routes>
//       <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/callback" element={<Callback />} />
//     </Routes>
//   );
// };

// export default App;

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
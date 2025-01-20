import logo from './logo.svg';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import Register from './components/Reg';

function App() {

  const { user } = useSelector((state) => state.user);
  console.log('Current user:', user); // Логируем текущего пользователя

  return (
    <Router>
      <Routes>
        {/* Если пользователь авторизован, перенаправляем его на страницу чата */}
        <Route
          path="/"
          element={user ? <Navigate to="/chat" /> : <Navigate to="/login" />}
        />
        {/* Страница чата доступна только авторизованным пользователям */}
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="/login" />}
        />
        {/* Страница входа */}
        <Route
          path="/login"
          element={<Login />}
        />
        {/* Страница регистрации */}
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;

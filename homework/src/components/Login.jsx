
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/UserSlice';
import { useNavigate, Link } from 'react-router';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Attempting to login...'); // Логируем попытку входа
      const resultAction = await dispatch(login({ username, password }));
      if (login.fulfilled.match(resultAction)) {
        console.log('Login successful, redirecting to /chat...'); // Логируем успешный вход
        navigate('/chat'); // Перенаправляем на страницу чата
      } else {
        console.error('Login failed:', resultAction.payload); // Логируем ошибку
      }
    };
  
    return (
      <div>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    );
  };
  
  export default Login;
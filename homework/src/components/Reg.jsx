import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { register } from '../store/UserSlice'; // Импортируем действие регистрации

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting to register...'); // Логируем попытку регистрации
    const resultAction = await dispatch(register({ username, password }));
    if (register.fulfilled.match(resultAction)) {
      console.log('Registration successful, redirecting to /login...'); // Логируем успешную регистрацию
      navigate('/login'); // Перенаправляем на страницу входа
    } else {
      console.error('Registration failed:', resultAction.payload); // Логируем ошибку
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
          {status === 'loading' ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
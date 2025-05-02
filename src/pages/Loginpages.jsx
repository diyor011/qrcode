// pages/LoginPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Fixed username/password
    if (username === 'samandar' && password === '1111fazon') {
      const token = 'some-token'; // Tokenni o'zgartirishingiz mumkin
      dispatch(loginSuccess({ user: { username }, token }));
      navigate('/register');
    } else {
      setError("Login yoki parol noto‘g‘ri");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-green-800"
        />
        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-green-800"
        />
        <button type="submit" className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800">Kirish</button>
      </form>
    </div>
  );
};

export default LoginPage;

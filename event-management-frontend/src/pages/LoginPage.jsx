import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login(credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      navigate('/events');
    } catch {
      setError('登入失敗，請檢查帳號密碼');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold">活動管理系統</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              帳號
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full p-2 border rounded"
              value={credentials.username}
              onChange={(e) => setCredentials({
                ...credentials,
                username: e.target.value
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              密碼
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full p-2 border rounded"
              value={credentials.password}
              onChange={(e) => setCredentials({
                ...credentials,
                password: e.target.value
              })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
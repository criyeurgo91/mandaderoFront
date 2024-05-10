import React, { useState } from 'react';
import axiosInstance from '../../Logic/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosInstance.post(`${apiUrl}/api2/login2/`, {
        email_account: email,
        password_account: password
      });
      console.log(response);
  
      if (response.data.detail === 'Inicio de sesión exitoso como administrador') {
        localStorage.setItem('token', response.data.jwt); 
        localStorage.setItem('name', response.data.name_user);
        localStorage.setItem('lastname', response.data.lastname_user); 
        localStorage.setItem('image', response.data.image_user);
        navigate('/Admin/');
        onLogin()
      } else {
        setError(response.data.detail);
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.');
      console.error('Error al iniciar sesión:', error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <div className="bg-white rounded-lg p-8 shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Administrador</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">Correo:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2">Ingresar</button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;

// App.js
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminRoutes from '../../Routes/AdminRoutes';
import StateContext from '../../Context/StateContext';
import LoginForm from '../../Components/Login/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Lógica para autenticar al usuario, por ejemplo, enviar una solicitud al servidor
    // Si la autenticación es exitosa, establece isAuthenticated en true
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión, por ejemplo, eliminar el token de sesión
    // Establece isAuthenticated en false
    setIsAuthenticated(false);
  };

  return (
    <StateContext>
      <BrowserRouter>
        <Routes>
          {/* Ruta para el formulario de inicio de sesión */}
          <Route path='/' element={<LoginForm onLogin={handleLogin} />} />

          {/* Ruta protegida para el panel de administración */}
          <Route path='/Admin/*' element={<AdminRoutes isAuthenticated={isAuthenticated} />} />
        </Routes>
      </BrowserRouter>
    </StateContext>
  );
}

export default App;

// App.js
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminRoutes from '../../Routes/AdminRoutes';
import StateContext from '../../Context/StateContext';
import PublicRoutes from '../../Routes/PublicRoutes';
import LoginForm from '../../Components/Login/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <StateContext>
      <BrowserRouter>
        <Routes>

          <Route path='/*' element={<PublicRoutes />} />
          <Route path='/Admin/*' element={<AdminRoutes />} />

          <Route path='/' element={<LoginForm onLogin={handleLogin} />} />
          <Route path='/Admin/*' element={<AdminRoutes isAuthenticated={isAuthenticated} />} />

        </Routes>
      </BrowserRouter>
    </StateContext>
  );
}

export default App;

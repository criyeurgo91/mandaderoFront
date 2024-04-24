import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from '../../Routes/AdminRoutes';
import StateContext from '../../Context/StateContext';
import PublicRoutes from '../../Routes/PublicRoutes';
import LoginForm from '../../Components/Login/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  return (
    <StateContext>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<PublicRoutes />} />
          
          <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
          <Route path='/Admin/*' element={<AdminRoutes isAuthenticated={isAuthenticated} />} />

        </Routes>
      </BrowserRouter>
    </StateContext>
  );
}

export default App;


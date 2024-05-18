import React, { useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from '../../Routes/AdminRoutes';
import StateContext from '../../Context/StateContext';
import LoginForm from '../../Components/Login/Login';

function App() {
  const [userType, setUserType] = useState(localStorage.getItem('userType'));
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = (type) => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  return (
    <StateContext>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<LoginForm onLogin={handleLogin} />} />
          <Route path='/Admin/*' element={<AdminRoutes isAuthenticated={isAuthenticated} userType={userType} />} />

        </Routes>
      </BrowserRouter>
    </StateContext>
  );
}

export default App;

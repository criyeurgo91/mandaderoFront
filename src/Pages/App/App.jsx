import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminRoutes from '../../Routes/AdminRoutes';
import StateContext from '../../Context/StateContext';
import LoginForm from '../../Components/Login/Login';
import SuperAdminRoutes from '../../Routes/superAdminRoutes';

function App() {
  const [userRole, setUserRole] = useState(""); 
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = (role) => { 
    setUserRole(role); 
    setIsAuthenticated(true);
    
  };

  return (
    <StateContext>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<LoginForm onLogin={handleLogin} />} />

          {userRole === "admin" && (
            <Route path='/Admin/*' element={<AdminRoutes isAuthenticated={isAuthenticated} isAdmin={true} />} />
          )}
          
          {userRole === "superadmin" && (
            <Route path='/Superadmin/*' element={<SuperAdminRoutes isAuthenticated={isAuthenticated} isSuperadmin={true} />} /> 

          )}
         
        </Routes>
      </BrowserRouter>
    </StateContext>
  );
}

export default App;



{/*import React, { useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from '../../Routes/AdminRoutes';
import StateContext from '../../Context/StateContext';
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
          <Route path='/*' element={<LoginForm onLogin={handleLogin} />} />
          <Route path='/Admin/*' element={<AdminRoutes isAuthenticated={isAuthenticated} />} />

        </Routes>
      </BrowserRouter>
    </StateContext>
  );
}

export default App;*/}

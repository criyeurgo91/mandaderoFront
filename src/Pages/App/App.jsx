import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import AdminRoutes from '../../Routes/AdminRoutes';
import StateContext from '../../Context/StateContext';
import LoginForm from '../../Components/Login/Login';
import LocationTrackerPage from '../../Components/Request/LocationTracker'; 

const App = () => {
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
      <LoadScript googleMapsApiKey="AIzaSyBohrC403d9OzquVBuQSS6RqQaUmLOa-Y0">
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<LoginForm onLogin={handleLogin} />} />
            <Route path='/admin/*' element={<AdminRoutes isAuthenticated={isAuthenticated} userType={userType} />} />
            <Route path='/location-tracker' element={<LocationTrackerPage />} />
          </Routes>
        </BrowserRouter>
      </LoadScript>
    </StateContext>
  );
};

export default App;

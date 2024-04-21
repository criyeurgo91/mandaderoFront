import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from '../../Routes/AdminRoutes';
import StateContext from '../../Context/StateContext';
import LoginForm from '../../Components/Login/Login';

function App() {
  return (

    <StateContext>

      <BrowserRouter>
        <Routes>
          <Route path='/Login/' element={<LoginForm />} />
          <Route path='/Admin/*' element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>

    </StateContext>
 
  );

}

export default App;

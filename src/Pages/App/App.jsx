import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from '../../Routes/AdminRoutes';
import StateContext from '../../Context/StateContext';
import PublicRoutes from '../../Routes/PublicRoutes';

function App() {
  return (

    <StateContext>

      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<PublicRoutes />} />
          <Route path='/Admin/*' element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>

    </StateContext>
 
  );

}

export default App;

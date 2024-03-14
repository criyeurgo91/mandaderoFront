import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from '../../Routes/AdminRoutes';
import ManderList from '../../Components/Manders/MandersList'
import StateContext from '../../Context/StateContext';

function App() {
  return (

    <StateContext>

      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<AdminRoutes />} />
          <Route path='/Admin/*' element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>

    </StateContext>
 
  );

}

export default App;

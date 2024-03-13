import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from '../../Routes/AdminRoutes';
import ManderList from '../../Components/Manders/MandersList'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/*' element={<AdminRoutes />} />
        <Route path='/Admin/*' element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;

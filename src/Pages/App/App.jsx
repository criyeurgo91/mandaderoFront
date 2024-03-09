import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from '../../Routes/AdminRoutes';
import VehicleForm from '../../Components/Forms/VehicleForm';
import ManderForm from '../../Components/Forms/ManderForm';

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

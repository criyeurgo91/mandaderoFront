import { Routes, Route } from "react-router-dom";

import Sidebar from "../Components/Navbar/Sidebar";
import Home from "../Pages/Home";
import UserList from "../Components/User/UserList";
import UserForm from "../Components/Forms/UserForm";
import VehicleForm from "../Components/Forms/VehicleForm";
import Register from "../Pages/Register/Register";
import VehicleList from "../Components/Vehicle/VehicleList";
import DetailUser from "../Pages/User/DetailUser";
import DocumentForm from "../Components/Forms/DocumentForm";

const AdminRoutes = () => {
    return (
        <>
            <div className="flex h-screen">
                <div className="col-span-1">
                    <Sidebar />
                </div>
                <main className="flex-grow overflow-y-auto">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='accounts' element={<Home />} />
                        <Route path='accounts/createaccount' element={<Register />} />
                        <Route path='users' element={<UserList />} />
                        <Route path='users/createUser' element={<UserForm />} />
                        <Route path='users/detail' element={<DetailUser />} />
                        <Route path='vehicles' element={<VehicleList />} />
                        <Route path='vehicles/createvehicle' element={<Home />} />
                        <Route path='manders' element={<Home />} />
                        <Route path='manders/createmanders' element={<Home />} />
                        <Route path='services' element={<Home />} />
                        <Route path='services/createservice' element={<Home />} />
                        <Route path='request' element={<Home />} />
                        <Route path='request/createrequest' element={<Home />} />
                        <Route path='requestmanager' element={<Home />} />
                        <Route path='requestmanager/createrequestmanager' element={<Home />} />
                        <Route path="document" element={<DocumentForm />} />
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default AdminRoutes;
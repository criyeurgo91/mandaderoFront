import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Navbar/Sidebar";
import Home from "../Pages/Home";
import UserView from "../Pages/User/UserView";
import MandersView from "../Pages/Manders/MandersView";
import ServiceView from "../Pages/Services/ServiceView";
import RequestView from "../Pages/Request/RequestView";
import HeaderComponent from "../Components/Headers/HeaderComponent";
import UserForm from "../Components/Forms/UserForm";
import UpdateUserForm from "../Components/Forms/UpdateUserForm";
import ManderForm from "../Components/Forms/ManderForm";
import UpdateManderForm from "../Components/Forms/UpdateManderForm";
import VehicleForm from "../Components/Forms/VehicleForm";
import UpdateAccountForm from "../Components/Forms/UpdateAccount";
import DocumentForm from "../Components/Forms/DocumentForm"
import DetailMander from "../Components/Manders/DetailMander"
import UpdateVehicleForm from "../Components/Forms/UpdateVehicleForm";
import UpdateDocumentForm from "../Components/Forms/UpdateDocumentForm";

const AdminRoutes = ({ isAuthenticated }) => {
    const navigate = useNavigate()

    if (!isAuthenticated) {
        navigate("/login");
        return null;
      }

    return (
        <>
            <div className="flex h-screen">
                <div className="col-span-1">
                    <Sidebar />
                </div>
                <div className='fixed w-full'>
                    <HeaderComponent />
                </div>
                <main className="flex-grow overflow-y-auto pt-14">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='users' element={<UserView/>} />
                        <Route path='users/profile' element={<UserForm/>} />
                        <Route path='users/updateaccount/:id' element={<UpdateAccountForm/>} />
                        <Route path='users/updateprofile/:id' element={<UpdateUserForm/>} />
                        <Route path='manders' element={<MandersView/>} />
                        <Route path='manders/profilemander' element={<ManderForm/>} />
                        <Route path='manders/updateaccountmander/:id' element={<UpdateAccountForm/>} />
                        <Route path='manders/updateuser/:id' element={<UpdateUserForm/>} />
                        <Route path='manders/updatemander/:id' element={<UpdateManderForm/>} />
                        <Route path='manders/vehicle/:id' element={<VehicleForm/>} />
                        <Route path='manders/detail/:id/updatevehicle/:id' element={<UpdateVehicleForm/>} />
                        <Route path='manders/document/:id' element={<DocumentForm/>} />
                        <Route path='manders/detail/:id/updatedocument/:id' element={<UpdateDocumentForm/>} />
                        <Route path='manders/detail/:id' element={<DetailMander/>} />
                        <Route path='services' element={<ServiceView/>} />
                        <Route path='request' element={<RequestView/>} />
                       
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default AdminRoutes;

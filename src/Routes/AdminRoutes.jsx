
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
import PageDefault from "../Pages/Default";
import ServicesForm from "../Components/Forms/ServicesForm";
import ServiceList from "../Components/Service/ServiceList";
import ViewDocument from "../Pages/Document/ViewDocument";
import MandersList from "../Components/Manders/MandersList";
import ManderForm from "../Components/Forms/ManderForm";
import HeaderComponent from "../Components/Headers/HeaderComponent";
import RequestList from "../Components/Request/RequestList";
//import ViewManders from "../Pages/Manders/ViewManders";

const AdminRoutes = () => {
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
                        <Route path='accounts' element={<PageDefault />} />
                        <Route path='accounts/createaccount' element={<Register />} />
                        <Route path='users' element={<UserList />} />
                        <Route path='users/createUser' element={<UserForm />} />
                        <Route path='users/detail' element={<DetailUser />} />
                        <Route path='/vehicles/*' element={<VehicleList />} />
                        <Route path="vehicles/createvehicle" element={<VehicleForm />} />
                        <Route path='manders' element={<MandersList />} />
                        <Route path='manders/createmander' element={<ManderForm />} />
                        <Route path='services' element={<ServiceList />} />
                        <Route path='services/createservice' element={<ServicesForm />} />
                        <Route path='request' element={<RequestList />} />
                        <Route path='request/createrequest' element={<PageDefault />} />
                        <Route path="document" element={<ViewDocument />} />
                        <Route path='document/createdocument' element={<DocumentForm />} />
                        <Route path='requestmanager' element={<PageDefault />} />
                        <Route path='requestmanager/createrequestmanager' element={<PageDefault />} />
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default AdminRoutes;

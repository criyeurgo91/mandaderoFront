import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Navbar/Sidebar";
import Home from "../Pages/Home";
import UserView from "../Pages/User/UserView";
import MandersView from "../Pages/Manders/MandersView";
import ServiceView from "../Pages/Services/ServiceView";
import RequestView from "../Pages/Request/RequestView";
import HeaderComponent from "../Components/Headers/HeaderComponent";
import RequestList from "../Components/Request/RequestList";
import UserForm from "../Components/Forms/UserForm";
import SinginForm from "../Components/Forms/SinginForm";
import UpdateUserForm from "../Components/Forms/UpdateUserForm";

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
                        <Route path='users/account' element={<SinginForm/>} />
                        <Route path='users/profile' element={<UserForm/>} />
                        <Route path='users/update/:id' element={<UpdateUserForm/>} />
                        <Route path='manders' element={<MandersView/>} />
                        <Route path='services' element={<ServiceView/>} />
                        <Route path='request' element={<RequestView/>} />
                       
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default AdminRoutes;

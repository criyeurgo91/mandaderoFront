import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Navbar/Sidebar";
import Home from "../Pages/Home";
import UserView from "../Pages/User/UserView";
import MandersView from "../Pages/Manders/MandersView";
import ServiceView from "../Pages/Services/ServiceView";
import RequestView from "../Pages/Request/RequestView";
import HeaderComponent from "../Components/Headers/HeaderComponent";
import RequestList from "../Components/Request/RequestList";

const AdminRoutes = ({ isAuthenticated }) => {

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
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
                        <Route path='/users' element={<UserView/>} />
                        <Route path='/manders' element={<MandersView/>} />
                        <Route path='/services' element={<ServiceView/>} />
                        <Route path='/request' element={<RequestView/>} />
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default AdminRoutes;

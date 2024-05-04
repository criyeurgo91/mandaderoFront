

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react"; 
import {
  RiHome4Line,
  RiUserSearchLine,
  RiLogoutBoxRLine,
  RiSteering2Line,
  RiToolsLine,
  RiNotification2Line
} from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate("/login");
  };

  return (
    <div 
      className={`bg-blue-400 h-full border-e-4 border-white flex flex-col justify-center relative ${isOpen ? "w-72" : "w-20"}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
        
      <nav className="flex flex-col gap-3 place-self-center justify-between">
        <NavLink to="/Admin"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-blue-500"
        >
          <RiHome4Line style={{ width: "30px", height: "30px", color: "white" }} />
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Admin</span>
        </NavLink>

        <NavLink to="/Admin/users"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiUserSearchLine style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Usuarios</span>
        </NavLink>

        <NavLink to="manders"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiSteering2Line style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Mandaderos</span>
        </NavLink>

        <NavLink to="services"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiToolsLine style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Servicios</span>
        </NavLink>

        <NavLink to="request"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiNotification2Line style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Solicitudes</span>
        </NavLink>
    
      </nav>

      <div
        onClick={logout}
        className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500 cursor-pointer"
      >
        <RiLogoutBoxRLine style={{ width: "30px", height: "30px", color: "white" }}/>
        <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Salir</span>
      </div>
    </div>
  );
};

export default Sidebar;









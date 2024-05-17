import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react"; 
import {
  RiHome4Line,
  RiUserSearchLine,
  RiLogoutBoxRLine,
  RiToolsLine,
  RiNotification2Line,
  RiTaxiWifiLine,
  RiTeamLine
} from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    navigate("/login");
  };

  const userType = localStorage.getItem('userType');

  return (
    <div 
      className={`bg-blue-800 h-full border-e-4 border-white flex flex-col justify-center relative ${isOpen ? "w-72" : "w-20"}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
        
      <nav className="flex flex-col gap-3 place-self-center justify-between" style={{ width: isOpen ? "calc(100%)" : "auto" }}>
        <NavLink to="/Admin"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-blue-500"
        >
          <RiHome4Line style={{ width: "30px", height: "30px", color: "white" }} />
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Inicio</span>
        </NavLink>

        {userType === 'Superadmin' && (
         <NavLink to="/Admin/administrators" 
           className={`flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-blue-500`}
         >
           <RiTeamLine style={{ width: "30px", height: "30px", color: "white" }} />
           <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Administradores</span>
         </NavLink>
         )}

        <NavLink to="request"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiNotification2Line style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Solicitudes</span>
        </NavLink>

        <NavLink to="manders"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiTaxiWifiLine style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Mandaderos</span>
        </NavLink>

        <NavLink to="/Admin/users"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiUserSearchLine style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Usuarios</span>
        </NavLink>

        

        <NavLink to="services"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiToolsLine style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Servicios</span>
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

{/*import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react"; 
import {
  RiHome4Line,
  RiUserSearchLine,
  RiLogoutBoxRLine,
  RiToolsLine,
  RiNotification2Line,
  RiTaxiWifiLine,
  RiTeamLine
} from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate("/login");
  };

  return (
    <div 
      className={`bg-blue-800 h-full border-e-4 border-white flex flex-col justify-center relative ${isOpen ? "w-72" : "w-20"}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
        
      <nav className="flex flex-col gap-3 place-self-center justify-between" style={{ width: isOpen ? "calc(100%)" : "auto" }}>
        <NavLink to="/Admin"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-blue-500"
        >
          <RiHome4Line style={{ width: "30px", height: "30px", color: "white" }} />
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Inicio</span>
        </NavLink>

        <NavLink to="/Admin/administrators"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-blue-500"
        >
          <RiTeamLine style={{ width: "30px", height: "30px", color: "white" }} />
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Administradores</span>
        </NavLink>

        <NavLink to="request"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiNotification2Line style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Solicitudes</span>
        </NavLink>

        <NavLink to="manders"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiTaxiWifiLine style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Mandaderos</span>
        </NavLink>

        <NavLink to="/Admin/users"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiUserSearchLine style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Usuarios</span>
        </NavLink>

        

        <NavLink to="services"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-blue-500"
        >
          <RiToolsLine style={{ width: "30px", height: "30px", color: "white" }}/>
          <span className={`ml-2 ${isOpen ? 'text-base font-bold' : 'hidden'}`} style={{ color: "white", width: "60px" }}>Servicios</span>
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

export default Sidebar;*/}









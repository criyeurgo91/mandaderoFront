import { NavLink, useNavigate } from "react-router-dom";
import {
  RiHome4Line,
  RiUserSearchLine,
  RiLogoutBoxRLine,
  RiSteering2Line,
  RiToolsLine,
  RiNotification2Line 
} from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate("/login");
  };

  return (
    <div className="bg-black h-full border-e-4 border-black flex flex-col justify-center">
      <nav className="flex flex-col gap-3 place-self-center justify-between">
        <NavLink to="/Admin"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-stone-500"
        >
          <RiHome4Line />
        </NavLink>

        <NavLink to="/Admin/users"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-stone-500"
        >
          <RiUserSearchLine />
        </NavLink>

        <NavLink to="manders"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-stone-500"
        >
          <RiSteering2Line />
        </NavLink>

        <NavLink to="services"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-stone-500"
        >
          <RiToolsLine />
        </NavLink>

        <NavLink to="request"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-stone-500"
        >
          <RiNotification2Line/>
        </NavLink>
    
      </nav>

      <div
        onClick={logout}
        className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-stone-500 cursor-pointer"
      >
        <RiLogoutBoxRLine />
      </div>
    </div>
  );
};

export default Sidebar;

import { Link, useNavigate } from "react-router-dom";
import {
  RiHome4Line,
  RiTeamLine,
  RiUserSearchLine,
  //RiSettings2Line,
  RiLogoutBoxRLine,
  RiCarLine,
  RiFileTextLine,
  RiSteering2Line,
  RiToolsLine,
  RiNotification2Line 
} from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate();
  
  const logout = () => {
    sessionStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="bg-black h-full border-e-4 border-black flex flex-col justify-center">
      <nav className="flex flex-col gap-3 place-self-center justify-between">
        <Link
          to="/Admin"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-stone-500"
        >
          <RiHome4Line />
        </Link>

        {/*<Link
          to="account"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-teal-300"
        >
          <RiTeamLine />
        </Link>*/}

        <Link
          to="users"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-stone-500"
        >
          <RiUserSearchLine />
        </Link>

        <Link
          to="manders"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-stone-500"
        >
          <RiSteering2Line />
        </Link>

        <Link
          to="request"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-stone-500"
        >
          <RiFileTextLine />
        </Link>

        <Link
          to="services"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px]  hover:bg-stone-500"
        >
          <RiToolsLine />
        </Link>

        {/*<Link
          to="request"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-teal-300"
        >
          <RiNotification2Line />
      </Link>*/}

        {/*<Link
          to="vehicles"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-teal-300"
        >
          <RiCarLine />
    </Link>*/}
    
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

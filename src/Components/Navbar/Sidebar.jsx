import { Link, useNavigate } from "react-router-dom";
import {
  RiHome4Line,
  RiTeamLine,
  RiUserSearchLine,
  RiAlarmWarningLine,
  RiLogoutBoxRLine,
  RiCarLine 
} from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("userName");
    navigate("/public");
  };

  return (
    <div className="bg-primary-900 h-full border-e-4 border-teal-300 flex flex-col justify-between">
      <nav className="flex flex-col gap-3 place-self-center py-40">
        <Link
          to="/Admin"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-teal-300"
        >
          <RiHome4Line />
        </Link>

        <Link
          to="services"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-teal-300"
        >
          <RiTeamLine />
        </Link>

        <Link
          to="users"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-teal-300"
        >
          <RiUserSearchLine />
        </Link>

        <Link
          to="request"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-teal-300"
        >
          <RiAlarmWarningLine />
        </Link>

        <Link
          to="vehicles"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-teal-300"
        >
          <RiCarLine /> 
        </Link>
      </nav>

      <div
        onClick={logout}
        className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-teal-300 cursor-pointer"
      >
        <RiLogoutBoxRLine />
      </div>
    </div>
  );
};

export default Sidebar;

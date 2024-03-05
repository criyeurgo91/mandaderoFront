import { Link, useNavigate } from "react-router-dom";
import {RiHome4Line, RiTeamLine, RiUserSearchLine, RiAlarmWarningLine, RiLogoutBoxRLine,} from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("userName");
    navigate("/public");
  };

  return (
    <div className="bg-primary-900 h-full border-e-4 border-teal-300 absolute inset-y-0 left-0 w-32">
      <nav className="flex flex-col gap-3 place-self-center py-40">
        <Link
          to="/dashboardAdmin"
          className="flex items-center gap-10 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-teal-300"
        >
          <RiHome4Line />
        </Link>

        <Link
          to="/Userlist"
          className="flex items-center gap-4 justify-center text-3xl text-white py-2 px-4 rounded-tr-[20px] hover:bg-teal-300"
        >
          <RiTeamLine />
        </Link>

        <Link
          to="infoUsers"
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
      </nav>

      <nav className="place-self-end gap-40 py-50">
        <div
          onClick={logout}
          className="flex gap-4 justify-center text-3xl text-white py2- px-4 rounded-tr-[20px] hover:bg-teal-300"
        >
          <RiLogoutBoxRLine />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
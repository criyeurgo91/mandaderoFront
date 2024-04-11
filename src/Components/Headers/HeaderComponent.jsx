import { useState, useEffect, useContext } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { globalContext } from "../../Context/globalContext";

const HeaderComponent = () => {
  const { getUserName, useName } = useContext(globalContext);
  const { state } = useLocation();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    getUserName();
    return () => clearInterval(intervalId);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1>
            <NavLink to="" className="text-xl font-bold">
              Dashboard
            </NavLink>
          </h1>
          <div className="text-sm mt-2">
            <p>{formattedDateTime}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            Admin
            <br />
            {useName}
          </span>
        </div>

        
      </div>

      <Outlet />
    </header>
  );
};

export default HeaderComponent;
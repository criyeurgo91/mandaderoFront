import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../config/apiConfig";
;


const HeaderComponent = () => {
  const { state } = useLocation();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      const userName = localStorage.getItem("name");
      const userLastName = localStorage.getItem("lastname");
      const userImage = localStorage.getItem("image");
      setUser({ name_user: userName, lastname_user: userLastName, image_user: userImage });
    }
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="bg-blue-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1>
            <NavLink to="" className="text-xl font-bold">
              Panel de Administracion
            </NavLink>
          </h1>
          <div className="text-sm mt-2">
            <p>{formattedDateTime}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <div>
              {user.image_user && (
                <img
                  src={user.image_user}
                  alt="user"
                  className="w-auto h-14 rounded-full ml-2"
                />
              )}
            </div>
          )}
          {user && (
            <div className="font-bold">
              <span>Bienvenido Sr.</span> 
              <div className="flex items-center">
                <span className="font-semibold ml-1">
                  {user.name_user} {user.lastname_user}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Outlet />

    </header>
  );
};

export default HeaderComponent;

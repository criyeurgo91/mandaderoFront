import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../config/apiConfig";

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
    const accountId = localStorage.getItem("accountId");
    if (accountId) {
      fetchUserDetails(accountId);
    }
  }, []);

  const fetchUserDetails = async (accountId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/user?account_id_account=${accountId}`
      );

      if (response.status !== 200) {
        console.log(response);
        throw new Error("Failed to fetch user details");
      }

      const userData = response.data;
      const userForCurrentAccount = userData.find(user => user.account_id_account === parseInt(accountId));
      
      if (userForCurrentAccount) {
        setUser(userForCurrentAccount);
      } else {
        console.log("User not found for account ID:", accountId);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

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
          {user && (
            <div className="font-bold">Welcome Sr.
            <span className="flex items-center font-semibold">
              {user.name_user} {user.lastname_user}
            </span>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </header>
  );
};

export default HeaderComponent;

import  { useState, useEffect } from 'react';
import { NavLink,  useLocation } from "react-router-dom";

import { IoFolder } from 'react-icons/io5';

const Header = () => {
  //const { getUserName, useName } = useContext(globalContext);
  const { state } = useLocation();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    //getUserName();
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
    <header className="bg-primary-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1>
            <NavLink to="/" className="text-xl font-bold">
              Mandaders
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
            {/*{useName}*/}
          </span>
        </div>

        
      </div>

      
    </header>
  );
};

// Aquí he cambiado el nombre de la constante "index" a "IndexPage"
const IndexPage = () => {
  return (
    <div className="bg-primary-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Mandaders</h1>
      </div>
    </div>
  );
};

export default IndexPage;
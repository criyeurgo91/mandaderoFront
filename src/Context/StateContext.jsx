import { useState } from "react";

import { globalContext } from "../Context/globalContext";

// este componente recibe un children que hace referencia a todas las paginas que queremos que compartan
// el mismo contexto

const StateContext = ({ children }) => {
  const [useName, setUserName] = useState("");

  //nos guarda el nombre del usuario en sesionStorage y tambien nos guarda el estad global con useContext
  const saveUserName = (userName) => {
    setUserName(userName);
    sessionStorage.setItem("userName", userName);
  };

  //obtiene el nombre del usuario desde sesionStorage y actualiza el estado del nombre de usuario
  const getUserName = () => {
    const userName = sessionStorage.getItem("userName");
    setUserName(userName);
  };

  return (
    <globalContext.Provider
      value={{
        useName,
        saveUserName,
        getUserName,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default StateContext;

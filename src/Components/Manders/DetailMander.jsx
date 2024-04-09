import React, { useState, useEffect } from 'react';
import apiUrl from '../../config/apiConfig';

const DetailMander = ({ manderId, onCreate, onClose }) => {
  const [manderData, setManderData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);

  const fetchData = async () => {
    try {
      const manderResponse = await fetch(`${apiUrl}/api/mander/${manderId}`);
      const manderData = await manderResponse.json();
      setManderData(manderData);
  
      const userDataResponse = await fetch(`${apiUrl}/api/user/${manderData.user_id_user}`);
      const userData = await userDataResponse.json();
      setUserData(userData);
  
      // Obtener documentos específicos para este mander
      const documentResponse = await fetch(`${apiUrl}/api/document/?user_id_user=${manderData.user_id_user}`);
      const documentData = await documentResponse.json();
      setDocumentData(documentData);
  
      // Obtener vehículos específicos para este mander
      const vehicleResponse = await fetch(`${apiUrl}/api/vehicle/?user_id_user=${manderData.user_id_user}`);
      const vehicleData = await vehicleResponse.json();
      setVehicleData(vehicleData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    const fetchDataAndCreate = async () => {
      await fetchData();
      // Invocar la función onCreate si existe y es una función
      if (typeof onCreate === 'function') {
        onCreate();
      }
    };

    if (manderId) {
      fetchDataAndCreate();
    }

    // Retorno de la función de cierre del efecto
    return () => {
      // Lógica de limpieza, si es necesario
    };
  }, [manderId, onCreate]);

  // Renderizar mientras se cargan los datos
  if (!manderData || !userData || !documentData || !vehicleData) {
    return <div>Cargando...</div>;
  }

  // Renderizar los datos
  return (
    <div>
      <h2>Detalles del Mander</h2>
      <div>
        <p>Nombre: {userData.name_user}</p>
        <p>Apellido: {userData.lastname_user}</p>
        {/* Agregar más campos según sea necesario */}
      </div>
      <div>
        <p>Dirección: {manderData.address_mander}</p>
        {/* Agregar más campos según sea necesario */}
      </div>
      <div>
      <p>Document: {documentData.type_document}</p>
        {/* Agregar más campos según sea necesario */}
      </div>
      <div>
        <p>Vehicle: {vehicleData.type_vehicle}</p>
        {/* Agregar más campos según sea necesario */}
      </div>
      <button
          type="reset"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={onClose}
        >
          Volver
        </button>
    </div>
  );
};

export default DetailMander;

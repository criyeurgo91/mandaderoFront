import React, { useState, useEffect } from 'react';
import apiUrl from '../../config/apiConfig';

const DetailMander = ({ manderId, onClose }) => {
  const [manderData, setManderData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [documentData, setDocumentData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const manderResponse = await fetch(`${apiUrl}/api/mander/${manderId}/`);
      const manderData = await manderResponse.json();
      setManderData(manderData);
  
      const userResponse = await fetch(`${apiUrl}/api/user/${manderData.user_id_user}/`);
      const userData = await userResponse.json();
      setUserData(userData);
  
      // Filtrar vehículos por user_id_user del mandadero
      const vehicleResponse = await fetch(`${apiUrl}/api/vehicle/?user_id_user=${manderData.user_id_user}`);
      const vehicleData = await vehicleResponse.json();
      setVehicleData(vehicleData.results); // Actualiza vehicleData con los resultados de la respuesta, no el objeto completo
  
      // Filtrar documentos por user_id_user del mandadero
      const documentResponse = await fetch(`${apiUrl}/api/document/?user_id_user=${manderData.user_id_user}`);
      const documentData = await documentResponse.json();
      setDocumentData(documentData.results); // Actualiza documentData con los resultados de la respuesta, no el objeto completo
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  

  return (
    <div className="bg-white text-black p-4">
      <h2 className="text-xl font-bold mb-4">Mander Details</h2>
      {manderData && userData && (
        <div>
          <div>
            <img src={manderData.image_mander} alt={`Image of ${userData.name_user} ${userData.lastname_user}`} className="w-32 h-auto mb-2 rounded-lg mx-auto" />
            <p><span className="font-bold">Name:</span> {userData.name_user} {userData.lastname_user}</p>
            <p><span className="font-bold">Phone:</span> {userData.phone_user}</p>
            <p><span className="font-bold">Address:</span> {manderData.address_mander}</p>
            <p><span className="font-bold">Has Car:</span> {manderData.ishavecar_mander ? 'Yes' : 'No'}</p>
            <p><span className="font-bold">Has Motorcycle:</span> {manderData.ishavemoto_mander ? 'Yes' : 'No'}</p>
            <p><span className="font-bold">Is Active:</span> {manderData.isactive_mander ? 'Yes' : 'No'}</p>
            <p><span className="font-bold">Is Validated:</span> {manderData.isvalidate_mander ? 'Yes' : 'No'}</p>
            <p><span className="font-bold">CC:</span> {manderData.cc_mander}</p>
          </div>
          {vehicleData && vehicleData.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mt-4">Vehicles:</h3>
              {vehicleData.map(vehicle => (
                <div key={vehicle.id_vehicle}>
                  <p><span className="font-bold">Brand:</span> {vehicle.brand_vehicle}</p>
                  <p><span className="font-bold">Plate:</span> {vehicle.plate_vehicle}</p>
                  <p><span className="font-bold">Model:</span> {vehicle.model_vehicle}</p>
                  <p><span className="font-bold">Color:</span> {vehicle.color_vehicle}</p>
                </div>
              ))}
            </div>
          )}
          {(!vehicleData || vehicleData.length === 0) && (
            <p>No vehicles found.</p>
          )}
  
          {documentData && documentData.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mt-4">Documents:</h3>
              {documentData.map(document => (
                <div key={document.id_document}>
                  <p><span className="font-bold">Type:</span> {document.type_document}</p>
                  <p><span className="font-bold">Is Verified:</span> {document.isverified_document ? 'Yes' : 'No'}</p>
                </div>
              ))}
            </div>
          )}
          {(!documentData || documentData.length === 0) && (
            <p>No documents found.</p>
          )}
        </div>
      )}
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onClose}>Close</button>
    </div>
  );}
  

export default DetailMander

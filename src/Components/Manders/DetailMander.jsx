import React, { useState, useEffect } from 'react';
import apiUrl from '../../config/apiConfig';

const DetailMander = ({ manderId, onClose }) => {
  const [manderData, setManderData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [documentData, setDocumentData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

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
  
      // Obtener vehículos del mandadero
      const vehicleResponse = await fetch(`${apiUrl}/api/vehicle/`);
      const allVehicleData = await vehicleResponse.json();
      const filteredVehicleData = allVehicleData.filter(vehicle => vehicle.user_id_user === manderData.user_id_user);
  
      // Obtener documentos del mandadero
      const documentResponse = await fetch(`${apiUrl}/api/document/`);
      const allDocumentData = await documentResponse.json();
      const filteredDocumentData = allDocumentData.filter(document => document.user_id_user === manderData.user_id_user);
  
      setVehicleData(filteredVehicleData);
      setDocumentData(filteredDocumentData);
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="bg-white text-black p-4 flex flex-wrap justify-between">
      {loading ? (
        <p>Loading...</p>
      ) : (
        manderData && userData && (
          <>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
              <img src={manderData.image_mander} alt={`Image of ${userData.name_user} ${userData.lastname_user}`} className="w-32 h-auto mb-2 rounded-lg mx-auto" />
              <div className="text-center">
                <p className="text-lg font-bold">{userData.name_user} {userData.lastname_user}</p>
                <p>{userData.phone_user}</p>
                <p>{manderData.address_mander}</p>
                <p>Has Car: {manderData.ishavecar_mander ? 'Yes' : 'No'}</p>
                <p>Has Motorcycle: {manderData.ishavemoto_mander ? 'Yes' : 'No'}</p>
                <p>Is Active: {manderData.isactive_mander ? 'Yes' : 'No'}</p>
                <p>Is Validated: {manderData.isvalidate_mander ? 'Yes' : 'No'}</p>
                <p>CC: {manderData.cc_mander}</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
              <h3 className="text-lg font-bold">Vehicles:</h3>
              {vehicleData.length > 0 ? (
                <div className="space-y-4">
                  {vehicleData.map(vehicle => (
                    <div key={vehicle.id_vehicle} className="p-4 border border-gray-200 rounded-lg">
                      <p><span className="font-bold">Brand:</span> {vehicle.brand_vehicle}</p>
                      <p><span className="font-bold">Plate:</span> {vehicle.plate_vehicle}</p>
                      <p><span className="font-bold">Model:</span> {vehicle.model_vehicle}</p>
                      <p><span className="font-bold">Color:</span> {vehicle.color_vehicle}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No vehicles found.</p>
              )}
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
              <h3 className="text-lg font-bold">Documents:</h3>
              {documentData.length > 0 ? (
                <div className="space-y-4">
                  {documentData.map(document => (
                    <div key={document.id_document} className="p-4 border border-gray-200 rounded-lg">
                      <p><span className="font-bold">Type:</span> {document.type_document || 'Not available'}</p>
                      <p><span className="font-bold">Is Verified:</span> {document.isverified_document ? 'Yes' : 'No'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No documents found.</p>
              )}
            </div>
          </>
        )
      )}
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 self-start" onClick={onClose}>Close</button>
    </div>
  );
}


export default DetailMander;

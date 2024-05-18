import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';

const DetailMander = () => {
  const { id } = useParams();
  const [manderData, setManderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const manderResponse = await fetch(`${apiUrl}/api/getlistmanders/${id}/`);
      const allManders = await manderResponse.json();

      if (allManders) {
        setManderData(allManders);
        console.log(allManders);
      } else {
        throw new Error(`Mander with ID ${id} not found.`);
      }
      //const mander = allManders.find(mander => mander.id_mander === parseInt(id));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  const handleClose = () => {
    navigate(-1);
  };


  const handleEditVehicle = (vehicleId) => {
    navigate(`updatevehicle/${vehicleId}`)
  }

  const handleEditDocument = (documentId) => {
    navigate(`updatedocument/${documentId}`)
  }


  if (loading) {
    return <div className="bg-sky-800 text-white p-4 py-20">Loading...</div>;
  }

  if (!manderData) {
    return <div className="bg-sky-800 text-white p-4 py-20">No mander found with ID {id}.</div>;
  }

  return (
    <div className="bg-sky-800 text-white p-4 py-20">
      <div className="flex justify-between mb-4">
        <div className="w-full md:w-1/3">
          <img src={manderData.image_mander} alt={`Image of ${manderData.name_user} ${manderData.lastname_user}`} className="w-auto h-44 mb-2 rounded-lg mx-auto" />
          <div className="text-center">
            <p className="text-lg font-bold">{manderData.name_user} {manderData.lastname_user}</p>
            <span className='font-bold'>Documento:</span>
            <p>{manderData.cc_mander}</p>
            <span className='font-bold'>Correo:</span>
            <p>
              <Link to={`updateaccountmander/${manderData.id_account}`}>
                {manderData.email_account}
              </Link>
            </p>
            <span className='font-bold'>Celular:</span>
            <p>{manderData.phone_user}</p>
            <span className='font-bold'>Direccion:</span>
            <p>{manderData.address_mander}</p>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-bold mb-2">Documentos</h2>
          {manderData.documents.map((document, index) => (
            <div key={index}>
              <p><img src={document.image_document} alt={`Document ${index}`} className='w-auto h-44' /></p>
              <p>Tipo de Documento: {document.type_document}</p>
              <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 mt-4"
                onClick={() => handleEditDocument(document.id_document)}
              >
                Editar
              </button>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-bold mb-2">Vehiculos</h2>
          {manderData.vehicles.map((vehicle, index) => (
            <div key={index}>
              <p><img src={vehicle.image_vehicle} alt={`Vehicle ${index}`} className='w-auto h-44' /></p>
              <p>Marca: {vehicle.brand_vehicle}</p>
              <p>Modelo: {vehicle.model_vehicle}</p>
              <p>Placa: {vehicle.plate_vehicle}</p>
              <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 mt-4"
                onClick={() => handleEditVehicle(vehicle.id_vehicle)}
              >
                Editar
              </button>
            </div>
          ))}



        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default DetailMander;

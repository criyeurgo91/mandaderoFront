import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

const RequestFinish = ({ finishedRequests }) => {
  const [imageMap, setImageMap] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/request_manager/`);
        const images = response.data
          .filter(item => item.status_requestmanager === 'terminado')
          .reduce((acc, item) => {
            acc[item.request_id_request] = item.image_requestmanager;
            return acc;
          }, {});
        setImageMap(images);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchImageUrls();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <table className="w-full">
        <thead className="bg-sky-800 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">Usuario</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Detalle</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Estado</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Evidencia</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Mandadero</th>
          </tr>
        </thead>
        <tbody>
          {finishedRequests.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">No hay solicitudes finalizadas</td>
            </tr>
          ) : (
            finishedRequests.map((request) => (
              <tr key={request.id_request}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div>{`${request.name_user} ${request.lastname_user}`}</div>
                  <div>{request.phone_user}</div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{request.detail_request}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{request.status_request}</td>
                <td className="border border-gray-300 px-4 py-2 text-center flex justify-center items-center">
                  {imageMap[request.id_request] && (
                    <img
                      src={imageMap[request.id_request]}
                      alt={`Evidencia de ${request.id_request}`}
                      className="w-24 h-24 cursor-pointer"
                      onClick={() => handleImageClick(imageMap[request.id_request])}
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">{request.name_mander}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-4 rounded shadow-lg">
            <button
              className="absolute top-2 right-2 p-2 text-white bg-black rounded-full"
              onClick={handleCloseModal}
            >
              X
            </button>
            <img src={selectedImage} width= "250px" alt="100%"  />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestFinish;

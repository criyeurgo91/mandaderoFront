import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestFinish = ({ finishedRequests }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await axios.get('https://mandaderos3.azurewebsites.net/api/request_manager/');
        setImageUrls(response.data.map(item => item.image_requestmanager));
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
        <thead className="bg-stone-600">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">Usuario</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Detalle</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Estado</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Evidencia</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Mandadero</th>
          </tr>
        </thead>
        <tbody>
          {finishedRequests.map((request, index) => (
            <tr key={request.id_request}>
              <td className="border border-gray-300 px-4 py-2 text-center">{`${request.name_user} ${request.lastname_user} - ${request.phone_user}`}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{request.detail_request}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{request.status_request}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {imageUrls.length > index && imageUrls[index] && (
                  <img
                    src={imageUrls[index]}
                    alt={`Evidencia de ${request.id_request}`}
                    className="w-24 h-24 cursor-pointer"
                    onClick={() => handleImageClick(imageUrls[index])}
                  />
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{request.name_mander}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-4xl mx-auto">
            <img src={selectedImage} alt="Imagen original" className="max-w-full max-h-full" />
            <button className="absolute top-0 right-0 m-4 p-2 text-black bg-white rounded-full" onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestFinish;

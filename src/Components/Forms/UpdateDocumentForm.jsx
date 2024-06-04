import React, { useState, useEffect } from 'react';
import { axiosGet, axiosPatch } from '../../Logic/Apihelpers';
import { useParams, useNavigate } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';

function UpdateDocumentForm() {

  const { id } = useParams();
  const [formData, setFormData] = useState({
    isverified_document: false,
    isdocument_vehicle: false,
  });
  const [existingImage, setExistingImage] = useState(null);
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    axiosGet(`${apiUrl}/api/document/${id}`).then(response => {
      setExistingImage(response.image_document);
      setFormData({
        isverified_document: response.isverified_document,
        isdocument_vehicle: response.isdocument_vehicle,
      });
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('isverified_document', formData.isverified_document);
    formDataToSubmit.append('isdocument_vehicle', formData.isdocument_vehicle);
    if (image) {
      formDataToSubmit.append('image_document', image);
    }
    
    axiosPatch(`${apiUrl}/api/document/${id}/`, formDataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      setShowModal(true); 
    }).catch(error => {
      console.error(error);
    });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleCancel = () => {
    navigate(-1); // Navegar hacia atrás en la historia
  };

  const closeModal = () => {
    setShowModal(false);
    navigate(-1); // Navegar hacia atrás en la historia
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="bg-sky-50 min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-sky-800 rounded-lg shadow-md mt-20 w-80">
        <div>
          <h1 className="text-2xl text-center font-bold mb-4 text-white">Actualizar Documento</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  name="isverified_document"
                  checked={formData.isverified_document}
                  onChange={handleInputChange}
                  className="ml-2"
                />
                <span className="ml-2 text-white">Documento Verificado</span>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  name="isdocument_vehicle"
                  checked={formData.isdocument_vehicle}
                  onChange={handleInputChange}
                  className="ml-2"
                />
                <span className="ml-2 text-white">Documento Vehiculo</span>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Imagen:</label>
              <input
                type="file"
                name="image_vehicle"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-40" />}
            </div>
            {existingImage && <img src={existingImage} alt="Existing User Image" className="w-24 h-24 mb-2 object-cover rounded-full" />}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Loading...' : 'Actualizar'}
              </button>
              <button
                type="button"
                className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mb-2"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4">Actualizacion Exitosa!</p>
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateDocumentForm;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosPost } from '../../Logic/Apihelpers';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';

const ServicesForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleServiceRegister = async (formData) => {
    const dataService = new FormData();
    dataService.append('name_service', formData.nameService);
    dataService.append('detail_service', formData.detailService);
    dataService.append('image_service', imageFile); // Usar la imagen del estado
    dataService.append('isvisible_service', formData.visibleService || false);
    
    axiosPost(`${apiUrl}/api/service/`, dataService)
      .then((response) => {
        if (response) {
          setShowModal(true);
        } else {
          alert('Failed to save Service');
        }
      })
      .catch((error) => {
        console.error('Error creating service:', error);
        alert('Failed to create service');
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate(-1); 
  };

  return (
    <div className="bg-sky-50 min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-sky-800 rounded-lg shadow-md mt-20 w-80">
        <h2 className="text-lg font-bold mb-4 text-white">Servicio</h2>
        <form onSubmit={handleSubmit(handleServiceRegister)} encType="multipart/form-data">
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="nameService">
              Nombre:
            </label>
            <input
              {...register('nameService', { required: true })}
              type="text"
              placeholder="nombre del servicio"
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.nameService ? 'border-red-500' : ''}`}
            />
            {errors.nameService && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="detailService">
              Detalle:
            </label>
            <input
              {...register('detailService', { required: true })}
              type="text"
              placeholder="detalle"
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.detailService ? 'border-red-500' : ''}`}
            />
            {errors.detailService && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="imageService">
              Imagen:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`p-2 shadow-lg rounded-lg w-full mb-4`}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-24 h-24 mb-2 object-cover rounded-full" />
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-20 mb-2"
          >
            Guardar
          </button>
          <button
            type="button"
            className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </form>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blues-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4">Servicio Creado!</p>
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesForm;

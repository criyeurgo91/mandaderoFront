import React, { useState } from 'react';
import axios from 'axios';

const userdefault = 1; // se debe enviar un id de usuario por defecto.

const VehicleForm = () => {
  const initialState = {
    image_vehicle: null,
    brand_vehicle: "",
    plate_vehicle: "",
    model_vehicle: null,
    color_vehicle: "",
    type_vehicle: null,
    isverified_vehicle: false,
    user_id_user: userdefault,
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [plateError, setPlateError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validar formato de placa según el tipo de vehículo seleccionado
    if (name === 'plate_vehicle') {
      const plateRegex = formData.type_vehicle === 'car' ? /^[A-Z]{3}\d{3}$/ : /^[A-Z]{3}\d{2}[A-Z]$/;
      if (plateRegex.test(value)) {
        setPlateError('');
      } else {
        setPlateError(formData.type_vehicle === 'car' ? 'Formato de placa correcto para Carro es Ejemplo: ABC123 MAYUSCULAS' : 'Formato de placa correcto para Moto es. Ejemplo: ABC12A MAYUSCULAS');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image_vehicle: file
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (plateError || !formData.brand_vehicle || !formData.plate_vehicle || !formData.model_vehicle || !formData.color_vehicle || !formData.type_vehicle) {
      alert('Por favor, complete todos los campos correctamente antes de enviar.');
      return;
    }
    
    const formDataToSend = new FormData();
    formDataToSend.append('image_vehicle', formData.image_vehicle);
    formDataToSend.append('brand_vehicle', formData.brand_vehicle);
    formDataToSend.append('plate_vehicle', formData.plate_vehicle);
    formDataToSend.append('model_vehicle', formData.model_vehicle);
    formDataToSend.append('color_vehicle', formData.color_vehicle);
    formDataToSend.append('type_vehicle', formData.type_vehicle);
    formDataToSend.append('isverified_vehicle', formData.isverified_vehicle);
    formDataToSend.append('user_id_user', formData.user_id_user);
    
    try {
      setLoading(true);
      const response = await axios.post('https://manders.azurewebsites.net/api/vehicle/', formDataToSend);
      console.log('Response:', response.data);
      setFormData(initialState);
      setLoading(false);
      alert('Formulario enviado exitosamente');
      window.location.href = '/Admin/vehicles';
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      alert('Hubo un error al enviar el formulario');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">Crear Vehículo Mandaderos</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Otros campos del formulario */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
          <select
            name="type_vehicle"
            value={formData.type_vehicle}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Type</option>
            <option value="car">Carro</option>
            <option value="bike">Moto</option>
            <option value="bicycle">Bicicleta</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Brand:</label>
          {/* Select de marcas de vehículos */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Plate:</label>
          {/* Input de placa del vehículo */}
          {plateError && <p className="text-red-500 text-xs italic">{plateError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Model:</label>
          {/* Select de modelo del vehículo */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Color:</label>
          {/* Select de colores disponibles */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Imagen:</label>
          {/* Input de imagen del vehículo */}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading || plateError}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;

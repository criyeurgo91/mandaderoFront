import { useState } from 'react';
import axios from 'axios';

const ManderForm = () => {
  const [formData, setFormData] = useState({
    email_account: '',
    password_account: '',
    name_user: '',
    lastname_user: '',
    phone_user: '',
    address_mander: '',
    cc_mander: '',
    isactive_mander: false,
    isvalidate_mander: false,
    type_vehicle: '',
    brand_vehicle: '',
    plate_vehicle: '',
    model_vehicle: '',
    color_vehicle: '',
    isverified_vehicle: false,
    image_mander: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image_mander: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/account/', {
        email_account: formData.email_account,
        password_account: formData.password_account
      });
      const accountId = response.data.id_account;

      const userResponse = await axios.post('http://127.0.0.1:8000/api/user/', {
        account_id_account: accountId,
        name_user: formData.name_user,
        lastname_user: formData.lastname_user,
        phone_user: formData.phone_user
      });
      const userId = userResponse.data.id_user;

      const manderResponse = await axios.post('http://127.0.0.1:8000/api/mander/', {
        user_id_user: userId,
        image_mander: formData.image_mander,
        address_mander: formData.address_mander,
        cc_mander: formData.cc_mander,
        isactive_mander: formData.isactive_mander,
        isvalidate_mander: formData.isvalidate_mander
      });
      const manderId = manderResponse.data.id_mander;

      const vehicleResponse = await axios.post('http://127.0.0.1:8000/api/vehicle/', {
        user_id_user: userId,
        image_vehicle: formData.image_vehicle,
        brand_vehicle: formData.brand_vehicle,
        plate_vehicle: formData.plate_vehicle,
        model_vehicle: formData.model_vehicle,
        color_vehicle: formData.color_vehicle,
        type_vehicle: formData.type_vehicle,
        isverified_vehicle: formData.isverified_vehicle
      });

      console.log('Mander, user, account, vehicle created:', manderResponse.data, userResponse.data, response.data, vehicleResponse.data);
      // Manejo de respuesta exitosa
    } catch (error) {
      console.error('Error creating Mander, User, Account, Vehicle:', error);
      // Manejo de error
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Crear Mander</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="email_account" className="block">Email:</label>
          <input type="email" id="email_account" name="email_account" value={formData.email_account} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label htmlFor="password_account" className="block">Contraseña:</label>
          <input type="password" id="password_account" name="password_account" value={formData.password_account} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        {/* Campos para el usuario */}
        <div>
          <label htmlFor="name_user" className="block">Nombre:</label>
          <input type="text" id="name_user" name="name_user" value={formData.name_user} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label htmlFor="lastname_user" className="block">Apellido:</label>
          <input type="text" id="lastname_user" name="lastname_user" value={formData.lastname_user} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label htmlFor="phone_user" className="block">Teléfono:</label>
          <input type="text" id="phone_user" name="phone_user" value={formData.phone_user} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        {/* Campos para el mandadero */}
        <div>
          <label htmlFor="address_mander" className="block">Dirección:</label>
          <input type="text" id="address_mander" name="address_mander" value={formData.address_mander} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label htmlFor="cc_mander" className="block">Cédula:</label>
          <input type="text" id="cc_mander" name="cc_mander" value={formData.cc_mander} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        {/* Campos para el vehículo */}
        <div>
          <label htmlFor="type_vehicle" className="block">Tipo de vehículo:</label>
          <select id="type_vehicle" name="type_vehicle" value={formData.type_vehicle} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full">
            <option value="">Seleccionar...</option>
            <option value="car">Carro</option>
            <option value="bike">Moto</option>
            <option value="bicycle">Bicicleta</option>
          </select>
        </div>
        <div>
          <label htmlFor="brand_vehicle" className="block">Marca del vehículo:</label>
          <input type="text" id="brand_vehicle" name="brand_vehicle" value={formData.brand_vehicle} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label htmlFor="plate_vehicle" className="block">Placa del vehículo:</label>
          <input type="text" id="plate_vehicle" name="plate_vehicle" value={formData.plate_vehicle} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label htmlFor="model_vehicle" className="block">Modelo del vehículo:</label>
          <input type="text" id="model_vehicle" name="model_vehicle" value={formData.model_vehicle} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label htmlFor="color_vehicle" className="block">Color del vehículo:</label>
          <input type="text" id="color_vehicle" name="color_vehicle" value={formData.color_vehicle} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label htmlFor="isverified_vehicle" className="block">¿Vehículo verificado?</label>
          <input type="checkbox" id="isverified_vehicle" name="isverified_vehicle" checked={formData.isverified_vehicle} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
        </div>
        
        {/* Campos para la imagen */}
        <div>
          <label htmlFor="image_mander" className="block">Imagen:</label>
          <input type="file" id="image_mander" name="image_mander" onChange={handleImageChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear Mander</button>
      </form>
    </div>
  );
};

export default ManderForm;

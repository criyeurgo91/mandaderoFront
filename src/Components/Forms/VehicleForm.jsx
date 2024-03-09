import  { useState } from 'react';
import axios from 'axios';

const userdefault = 2; // se debe enviar un id de usuario por defecto.

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
    if (name === 'plate_vehicle') {
      // Validar formato de placa según el tipo de vehículo seleccionado
      const plateRegex = formData.type_vehicle === 'car' ? /^[A-Z]{3}\d{3}$/ : /^[A-Z]{3}\d{2}[A-Z]$/;
      //const plateRegex = /^[A-Z]{3}\d{3}$|^[A-Z]{3}\d{2}[A-Z]$/;

      if (plateRegex.test(value)) {
        setPlateError('');
      } else {
        setPlateError(formData.type_vehicle === 'car' ? 'Formato de placa correcto para Carro es Ejemplo: ABC123 MAYUSCULAS' : 'Formato de placa correcto para Moto es. Ejemplo: ABC12A MAYUSCULAS');
      }
    }
    setFormData({
      ...formData,
      [name]: value
    });
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
    if(plateError){
      alert("Error Placa");
    }
    console.log(formData);
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
    
    console.log(formDataToSend);
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/api/vehicle/', formDataToSend);
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

  // Generar un array con las marcas de vehículos
  const vehicleBrands = ['Chevrolet', 'Hyundai', 'Kia', 'Volkswagen', 'Ford', 'Nissan', 'Chana', 'Honda', 'Yamaha', 'Harley-Davidson', 'Kawasaki', 'Suzuki'];

  // Generar un array con los años desde 1999 hasta el año actual
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = 1999; year <= currentYear; year++) {
    years.push(year);
  }

  // Generar un array con colores disponibles
  const colors = ["Selecciona el Color", "Blanco", "Negro", "Rojo", "Azul", "Gris", "Plata", "Amarillo", "Multicolor"];

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">Crear Vehículo Mandaderos</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          <select
            name="brand_vehicle"
            value={formData.brand_vehicle}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Seleciona la Marca</option>
            {vehicleBrands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Plate:</label>
          <input
            type="text"
            name="plate_vehicle"
            value={formData.plate_vehicle}
            onChange={handleInputChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${plateError ? 'border-red-500' : ''}`}
            placeholder=" placa"
          />
          {plateError && <p className="text-red-500 text-xs italic">{plateError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Model:</label>
          <select
            name="model_vehicle"
            value={formData.model_vehicle}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Modelo (año)</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Color:</label>
          {/* Campo de entrada con la lista de colores */}
          <select
            name="color_vehicle"
            value={formData.color_vehicle}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Imagen:</label>
          <input
            type="file"
            name="image_vehicle"
            onChange={handleFileChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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

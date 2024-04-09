import { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

const VehicleForm = ({ manderId, onCreate, onClose }) => {
  const [formData, setFormData] = useState({
    image_vehicle: null,
    brand_vehicle: "",
    plate_vehicle: "",
    model_vehicle: null,
    color_vehicle: "",
    type_vehicle: null,
    isverified_vehicle: false,
    user_id_user: manderId // Asignando el ID del mander al formulario
  });

  const [loading, setLoading] = useState(false);
  const [plateError, setPlateError] = useState('');
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/${manderId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [manderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (plateError || !formData.brand_vehicle || !formData.plate_vehicle || !formData.model_vehicle || !formData.color_vehicle || !formData.type_vehicle) {
      alert('Por favor, complete todos los campos correctamente antes de enviar.');
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/api/vehicle/`, formDataToSend);
      console.log('Response:', response.data);
      setFormData({
        image_vehicle: null,
        brand_vehicle: "",
        plate_vehicle: "",
        model_vehicle: null,
        color_vehicle: "",
        type_vehicle: null,
        isverified_vehicle: false,
        user_id_user: manderId // Restaurando el ID del mander al formulario después del envío
      });
      setLoading(false);
      alert('Formulario enviado exitosamente');

      onCreate();
      onClose();

    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      alert('Hubo un error al enviar el formulario');
    }
  };

  const vehicleBrandsCar = [
    'Chevrolet', 'Hyundai', 'Kia', 'Volkswagen', 'Ford', 'Nissan', 'Chery', 'Honda', 'Toyota',
    'Mitsubishi', 'Mazda','Fiat','Peugeot','Renauolt'
  ];

  const vehicleBrandsBike = [
    'Yamaha',  'Kawasaki', 'Suzuki',  
    'Honda', 'KTM',  'Suzuki ', 
    'Bajaj', 'Hero','Auteco','Akt','Victory','Tvs','Kymco','Pulsar',
  ];

  const vehicleBrandsToShow = formData.type_vehicle === 'car' ? vehicleBrandsCar : vehicleBrandsBike;

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = 1999; year <= currentYear; year++) {
    years.push(year);
  }

  const colors = [
    "Selecciona el Color",
    "Blanco", "Negro", "Gris", "Plata", "Rojo", "Azul", "Amarillo",
    "Verde", "Naranja", "Marrón", "Beige", "Blanco Perla", "Negro Mate",
    "Gris Oscuro", "Azul Marino", "Rojo Carmesí", "Amarillo Brillante","Multicolor",
  ];

  return (
    <div className="bg-slate-500 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full mx-auto p-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl text-center font-bold mb-4">Form Vehicles</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
              <select
                name="type_vehicle"
                value={formData.type_vehicle}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              >
                <option value="">Select Type</option>
                <option value="car" className="hover:bg-gray-100 cursor-pointer">Carro</option>
                <option value="bike" className="hover:bg-gray-100 cursor-pointer">Moto</option>
                <option value="bicycle" className="hover:bg-gray-100 cursor-pointer">Bicicleta</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Brand:</label>
              <select
                name="brand_vehicle"
                value={formData.brand_vehicle || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              >
                <option value="">Seleciona la Marca</option>
                {vehicleBrandsToShow.map((brand, index) => (
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
                value={formData.plate_vehicle || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {plateError && <p className="text-red-500 text-xs italic">{plateError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Model:</label>
              <select
                name="model_vehicle"
                value={formData.model_vehicle || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              >
                <option value="">Select Model</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Color:</label>
              <select
                name="color_vehicle"
                value={formData.color_vehicle || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              >
                {colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
              <input
                type="file"
                name="image_vehicle"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
              <button
          type="reset"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={onClose}
        >
          Cancel
        </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleForm;

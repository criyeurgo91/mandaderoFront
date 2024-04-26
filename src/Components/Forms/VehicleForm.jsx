import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';

const VehicleForm = () => {

  const { id } = useParams();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    image_vehicle: null,
    brand_vehicle: "",
    plate_vehicle: "",
    model_vehicle: '',
    color_vehicle: "",
    type_vehicle: '',
    isverified_vehicle: false,
    user_id_user: id // Asignando el ID del mander al formulario
  });

  
  const [loading, setLoading] = useState(false);
  const [plateError, setPlateError] = useState('');
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [previewImage, setPreviewImage] = useState(null)

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
    setPreviewImage(URL.createObjectURL(file));
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
        model_vehicle: '',
        color_vehicle: "",
        type_vehicle: '',
        isverified_vehicle: false,
        user_id_user: id 
      });
      setLoading(false);
      alert('Formulario enviado exitosamente');
      navigate (-1)


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
    'Honda', 'KTM',  'Suzuki ', 'Ducati',
    'Bajaj', 'Hero','Auteco','Akt','Victory','Tvs','Kymco','Pulsar',
  ];

  const vehicleBrandsToShow = formData.type_vehicle === 'car' ? vehicleBrandsCar : vehicleBrandsBike;

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = 1990; year <= currentYear; year++) {
    years.push(year);
  }

  const colors = [
    
    "White", "Black", "Gray", "Silver", "Red", "Blue", "Yellow",
    "Green", "Orange", "Brown", "Beige", "Pearl White", "Matte Black",
    "Dark Gray", "Navy Blue", "Crimson Red", "Bright Yellow", "Multicolor",
  ];

  const handleCancel = () => {
    window.history.back(); 
  }

  return (
    <div className="bg-stone-900 min-h-screen flex justify-center items-center">
    <div className="max-w-md mx-auto p-6 bg-black rounded-lg shadow-md mt-20 w-80">
      <div>
        <div>
          <h1 className="text-2xl text-center font-bold mb-4 text-white">Vehicle Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text_black">
              <label className="block text-white text-sm font-bold mb-2">Type:</label>
              <select
                name="type_vehicle"
                value={formData.type_vehicle}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              >
                <option value="">Select Type</option>
                <option value="car" className="hover:bg-gray-100 cursor-pointer">Car</option>
                <option value="bike" className="hover:bg-gray-100 cursor-pointer">Bike</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Brand:</label>
              <select
                name="brand_vehicle"
                value={formData.brand_vehicle || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              >
                <option value="">Select Brand</option>
                {vehicleBrandsToShow.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Plate:</label>
              <input
                type="text"
                placeholder='enter plate'
                name="plate_vehicle"
                value={formData.plate_vehicle || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              />
              {plateError && <p className="text-red-500 text-xs italic">{plateError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Model:</label>
              <select
                name="model_vehicle"
                value={formData.model_vehicle || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
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
              <label className="block text-white text-sm font-bold mb-2">Color:</label>
              <select
                name="color_vehicle"
                value={formData.color_vehicle || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              >
                <option value="">Select Color</option>
                {colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">Image:</label>
              <input
                type="file"
                name="image_vehicle"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-40" />}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
              <button
          type="reset"
          className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VehicleForm;

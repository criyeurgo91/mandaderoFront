import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/vehicle/');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Vehicle List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="font-bold">Brand: {vehicle.brand_vehicle}</p>
            <p>Plate: {vehicle.plate_vehicle}</p>
            <p>Model: {vehicle.model_vehicle}</p>
            <p>Color: {vehicle.color_vehicle}</p>
            <p>Type: {vehicle.type_vehicle}</p>
            <p>Verified: {vehicle.isverified_vehicle ? 'Yes' : 'No'}</p>
            <p>User ID: {vehicle.user_id_user}</p>
          </div>
        ))}
      </div>
      
      <Link
        to="vehicles/createvehicle" // Ruta a la que se redirigirá
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        New Vehicle
      </Link>
    </div>
  );
};

export default VehicleList;

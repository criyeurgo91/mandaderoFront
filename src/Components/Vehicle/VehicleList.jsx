import  { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
import { Link } from 'react-router-dom';
>>>>>>> b0cf288532144c9da8a04375b786c7e6f0c5e9fe

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.plate_vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Vehicle List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by vehicle plate"
          className="flex-1 border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
          onChange={handleSearch}
        />
        <Link
          to="/vehicles/createvehicle"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          New Vehicle
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Plate</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">Color</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Verified</th>
            <th className="border px-4 py-2">User ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="border px-4 py-2">{vehicle.brand_vehicle}</td>
              <td className="border px-4 py-2">{vehicle.plate_vehicle}</td>
              <td className="border px-4 py-2">{vehicle.model_vehicle}</td>
              <td className="border px-4 py-2">{vehicle.color_vehicle}</td>
              <td className="border px-4 py-2">{vehicle.type_vehicle}</td>
              <td className="border px-4 py-2">{vehicle.isverified_vehicle ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2">{vehicle.user_id_user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleList;

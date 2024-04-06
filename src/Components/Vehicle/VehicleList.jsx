import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/vehicle/`);
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
    <div className="bg-white text- min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Vehicle List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by vehicle plate"
            className="w-1/2 border-2 border-gray-700 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
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
          <thead className='bg-gray-300'>
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
              <tr key={vehicle.id_vehicle} className='border border-black'>
                <td className="border px-4 py-2 bg-white text-black">{vehicle.brand_vehicle}</td>
                <td className="border px-4 py-2 bg-white text-black">{vehicle.plate_vehicle}</td>
                <td className="border px-4 py-2 bg-white text-black">{vehicle.model_vehicle}</td>
                <td className="border px-4 py-2 bg-white text-black">{vehicle.color_vehicle}</td>
                <td className="border px-4 py-2 bg-white text-black">{vehicle.type_vehicle}</td>
                <td className="border px-4 py-2 bg-white text-black">{vehicle.isverified_vehicle ? 'Yes' : 'No'}</td>
                <td className="border px-4 py-2 bg-white text-black">{vehicle.user_id_user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleList;

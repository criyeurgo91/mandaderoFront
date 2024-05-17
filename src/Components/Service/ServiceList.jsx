import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';
import UpdateServiceForm from '../Forms/UpdateServiceForm';
import ServicesForm from '../Forms/ServicesForm';
import apiUrl from '../../config/apiConfig';

function ServiceList() {
  const [services, setServices] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/service/`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCreateService = () => {
    setShowCreateForm(true);
  };

  const handleEditService = (serviceId) => {
    setSelectedServiceId(serviceId);
    setShowUpdateForm(true);
  };

  const handleUpdate = () => {
    fetchServices();
    setShowUpdateForm(false);
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`${apiUrl}/api/service/${serviceId}`);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const filteredServices = services.filter(service => 
    service.name_service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-stone-900 text-white min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4 py-3">Lista de Servicios</h1>
        {showUpdateForm && (
          <UpdateServiceForm serviceId={selectedServiceId} onUpdate={handleUpdate} onClose={() => setShowUpdateForm(false)} />
        )}
        {!showUpdateForm && (
          <>
            {showCreateForm && (
              <ServicesForm onCreate={fetchServices} onClose={() => setShowCreateForm(false)} />
            )}
            {!showCreateForm && (
              <div className="overflow-x-auto">
                <div className="flex mb-4">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-1/2 border-2 border-gray-500 bg-black text-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                    onChange={handleSearch}
                  />
                  <button
                    className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 flex items-center"
                    onClick={handleCreateService}
                  >
                    <FiPlus className="mr-2" /> Nuevo servicio
                  </button>
                </div>
                <table className="w-full bg-stone-900 shadow-md rounded my-6">
                  <thead className='bg-stone-600'>
                    <tr>
                    
                      <th className="border px-4 py-2">Nombre</th>
                      <th className="border px-4 py-2">Detalle</th>
                      <th className="border px-4 py-2">Imagen</th>
                      <th className="border px-4 py-2">Actualizar</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map(service => (
                      <tr key={service.id_service} className='border border-gray-300'>
                        <td className="border px-4 py-2">{service.name_service}</td>
                        <td className="border px-4 py-2">{service.detail_service}</td>
                        <td className="border px-4 py-2">
                            {service.image_service && (
                        <img src={service.image_service} alt={service.name_service} className="w-16 h-16 object-cover" />
                          )}
                       </td>
                        <td className=" flex justify-center items-center mt-6 ">
                          <button
                            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-4"
                            onClick={() => handleEditService(service.id_service)}
                          >
                            Editar
                          </button>
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ServiceList;

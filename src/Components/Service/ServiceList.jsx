import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServicesForm from '../Forms/ServicesForm';
import UpdateServiceForm from '../Forms/UpdateUserForm';

function ServiceList ()  {
  const [services, setServices] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedserviceId, setSelectedServiceId] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/service/');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredServices = services.filter(service =>
    service.name_service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateService = () => {
    setShowCreateForm(true);
  };

  const handleEditService = (serviceId) => {
    setSelectedServiceId(serviceId);
    setShowUpdateForm(true);
  };

  const handleUpdate = () => {
    fetchServices();
    setShowUpdateForm(true);
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/service/${serviceId}`);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Service List</h2>
      {showUpdateForm ? (
        <UpdateServiceForm serviceId={selectedserviceId} onUpdate={handleUpdate} onClose={() => setShowUpdateForm(false)} />
      ) : (
        <>
          {showCreateForm ? (
            <ServicesForm onCreate={fetchServices} onClose={() => setShowCreateForm(false)} />
          ) : (
            <div className="overflow-x-auto">
              <div className="flex mb-4">
                <input
                  type="text"
                  className="w-1/2 px-3 py-2 border rounded-md mr-2"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleCreateService}
                >
                  New Service
                </button>
              </div>
              {alertMessage && <div className="text-red-500">{alertMessage}</div>}
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className='px-4 py-2'>Name</th>
                    <th className="px-4 py-2">Detail</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map(service => (
                    <tr key={service.id_service}>
                      <td className="border px-4 py-2">{service.name_service}</td>
                      <td className="border px-4 py-2">{service.detail_service}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                          onClick={() => handleEditService(service.id_service)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleDeleteService(service.id_service)}
                        >
                          Delete
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
  );
};

export default ServiceList;

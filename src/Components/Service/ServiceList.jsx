import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosGet, axiosPatch } from '../../Logic/Apihelpers';
import apiUrl from '../../config/apiConfig';

function ServiceList() {
  const [service, setService] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [serviceIsVisible, setServiceIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosGet(`${apiUrl}/api/service/`)
      .then(async (response) => {
        console.log(response);

        const serviceWithIsVisible = response.map((service) => ({
          ...service,
          isvisible_service: service.isvisible_service,
        }));

        setService(serviceWithIsVisible);
        setFilteredServices(serviceWithIsVisible);

        if (serviceWithIsVisible.length > 0) {
          setServiceIsVisible(serviceWithIsVisible[0].isvisible_service || false);
        }
      })
      .catch(error => {
        console.error('Error fetching service list:', error);
      });
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = service.filter(
      (service) =>
        service.name_service.toLowerCase().includes(searchTerm) ||
        service.detail_service.toLowerCase().includes(searchTerm)
    );
    setFilteredServices(filtered);
    setAlertMessage(filtered.length === 0 ? "Service doesn't exist" : '');
  };

  const handleNewService = () => {
    navigate('create');
  };

  const handleEditService = (serviceId) => {
    setSelectedServiceId(serviceId);
    navigate(`update/${serviceId}`);
  };

  const handleToggleVisible = async (serviceId, isVisible) => {
    try {
      const serviceToUpdate = service.find(service => service.id_service === serviceId);
      if (!serviceToUpdate) {
        console.error(`Service with ID ${serviceId} not found.`);
        return;
      }

      const updatedService = {
        isvisible_service: !isVisible,
      };

      await axiosPatch(`${apiUrl}/api/service/${serviceId}/`, updatedService);

      const updatedServices = service.map(service =>
        service.id_service === serviceId ? { ...service, isvisible_service: !isVisible } : service
      );
      setService(updatedServices);
      setFilteredServices(updatedServices);
    } catch (error) {
      console.error('Error toggling service visible state:', error);
      alert('Failed to toggle service visible state');
    }
  };

  return (
    <div className="bg-sky-50 text-white min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-5 py-3 text-sky-800">Servicios</h2>
        <div className="container mx-auto px-4">
          <div className="flex mb-4">
            <input
              type="text"
              className="w-1/2 border-2 border-blue-700 bg-sky-950 h-10 px-5 rounded-lg text-sm focus:outline-none"
              placeholder="Buscar..."
              onChange={handleSearch}
            />
            <button
              className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={handleNewService}
            >
              Nuevo Servicio
            </button>
          </div>
          {alertMessage && <div className="text-red-950">{alertMessage}</div>}
          <div className='table-container text-sky-800'>
            <table className="w-full border-collapse border">
              <thead className="bg-sky-950 text-white">
                <tr>
                  <th className="px-4 py-2 border">Nombre</th>
                  <th className="px-4 py-2 border">Detalle</th>
                  <th className="px-4 py-2 border">Imagen</th>
                  <th className="px-4 py-2 border">Actualizar</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service.id_service} className="border border-white">
                    <td className="border px-4 py-2">
                      {service.name_service}
                      <div className="ml-2 py-2 relative">
                        <input
                          type="checkbox"
                          checked={service.isvisible_service}
                          onChange={() => handleToggleVisible(service.id_service, service.isvisible_service)}
                          id={`toggle-${service.id_service}`}
                          className="sr-only"
                        />
                        <label
                          htmlFor={`toggle-${service.id_service}`}
                          className={`block cursor-pointer w-12 h-5 rounded-full ${service.isvisible_service ? 'bg-blue-500' : 'bg-gray-300'}`}
                        >
                          <span
                            className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${service.isvisible_service ? 'translate-x-7' : 'translate-x-0'}`}
                          ></span>
                        </label>
                        <span className='ml-2'>{service.isvisible_service ? "Visible" : "No visible"}</span>
                      </div>
                    </td>
                    <td className="border px-4 py-2">{service.detail_service}</td>
                    <td className="border px-4 py-2">
                      {service.image_service && (
                        <img src={service.image_service} alt={service.name_service} className="w-16 h-16 object-cover" />
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex justify-center">
                        <button
                          className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded ml-2"
                          onClick={() => handleEditService(service.id_service)}
                        >
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceList;

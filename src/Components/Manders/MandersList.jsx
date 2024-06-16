import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosGet, axiosPatch } from '../../Logic/Apihelpers';
import apiUrl from '../../config/apiConfig';
import { FaCar, FaMotorcycle, FaLightbulb } from 'react-icons/fa';
import '../../Components/Manders/index.css'

function MandersList() {
  const [manders, setManders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredManders, setFilteredManders] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedManderId, setSelectedManderId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRegister, setSelectedRegister] = useState('');
  const [selectedRegisterMander, setSelectedRegisterMander] = useState('');
  const [manderIsActive, setManderIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosGet(`${apiUrl}/api/getlistmanders/`)
      .then(async (response) => {
        console.log(response);
        
        const mandersWithIsActive = await Promise.all(response.map(async (mander) => {
          try {
            const userResponse = mander.isactive_user;
            return { ...mander, isactive_user: userResponse };
          } catch (error) {
            console.error(`Error fetching state for mander ${mander.id_mander}:`, error);
            return mander;
          }
        }));

        setManders(mandersWithIsActive);
        setFilteredManders(mandersWithIsActive);
  
        if (mandersWithIsActive.length > 0) {
          setManderIsActive(mandersWithIsActive[0].isactive_user || false);
        }
      })
      .catch(error => {
        console.error('Error fetching mander list:', error);
      });
  }, []);
  

  const handleToggleActive = async (manderId, userId, isActive) => {
    try {
      // Buscar el mandadero en la lista por su ID
      const manderToUpdate = manders.find(mander => mander.id_mander === manderId);
      if (!manderToUpdate) {
        console.error(`Mander with ID ${manderId} not found.`);
        return;
      }
  
      const updatedMander = {
        isactive_user: !isActive,
      };
  
      await axiosPatch(`${apiUrl}/api/user/${userId}/`, updatedMander);
  
      // Actualizar el estado local después de que se haya confirmado la actualización en el servidor
      const updatedManders = manders.map(mander =>
        mander.id_mander === manderId ? { ...mander, isactive_user: !isActive } : mander
      );
      setManders(updatedManders);
      setFilteredManders(updatedManders);
    } catch (error) {
      console.error('Error toggling mander active state:', error);
      alert('Failed to toggle mander active state');
    }
  };


  const handleSearchMander = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = manders.filter(
      (mander) =>
        mander.name_user.toLowerCase().includes(searchTerm) ||
        mander.lastname_user.toLowerCase().includes(searchTerm) ||
        mander.phone_user.toLowerCase().includes(searchTerm)
    );
    setFilteredManders(filtered);

    if (filtered.length === 0) {
      setAlertMessage("Mandadero doesn't exist");
    } else {
      setAlertMessage('');
    }
  };

  const handleNewMander = () => {
    navigate('profilemander');
  };

  const handleEdit = (manderId, userId) => {
    setSelectedManderId(manderId);
    setSelectedUserId(userId);
    navigate(`updatemander/${manderId}`, { state: { id_user: userId, id_mander: manderId } });
  };
  
  

  const handleRegister = (userId) => {
    if (selectedRegisterMander === userId) {
      setSelectedRegister('');
      setSelectedRegisterMander(null);
    } else {
      setSelectedRegisterMander(userId);
      setSelectedRegister('');
    }
  };

  const handleRegisterSelect = (option) => {
    setSelectedRegister(option);
    if (option === 'vehicle') {
      navigate(`vehicle/${selectedRegisterMander}`);
    } else if (option === 'document') {
      navigate(`document/${selectedRegisterMander}`);
    }
  };

  const handleDetail = (manderId) => {
    navigate(`detail/${manderId}`);
  };


  return (
    <div className="bg-sky-50 text-sky-800 min-h-screen mb-20">
      <div className="container mx-auto px-4 ">
        <h2 className="text-2xl font-bold mb-5 py-3">Mandaderos</h2>
        {alertMessage && <div className="text-red-500">{alertMessage}</div>}
        <div className="flex mb-4">
          <input
            type="text"
            className="w-1/2 border-2 border-blue-500 bg-sky-950 h-10 px-6 rounded-lg text-sm text-white focus:outline-none"
            placeholder="Buscar..."
            onChange={handleSearchMander}
          />
          <button
            className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={handleNewMander}
          >
            Registrar
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredManders.map((mander, index) => (
            <div key={index} className="bg-sky-800 rounded-lg shadow-md p-2 border text-white border-black flex flex-col">
              <div className="flex justify-center py-2">
                <img src={mander['image_mander']} alt="Mander" className="w-auto h-40 rounded-md" />
              </div>
              <div className="flex-grow">
                <p className="text-sm mb-1">
                  <span className="font-bold"></span> {mander['name_user']} {mander['lastname_user']}
                </p>
                <div className="ml-2 py-2 relative">
                  <input
                    type="checkbox"
                    checked={mander.isactive_user}
                    onChange={() => handleToggleActive(mander.id_mander, mander.id_user, mander.isactive_user)}
                    id={`toggle-${mander.id_mander}`}
                    className="sr-only"
                  />
                  <label
                    htmlFor={`toggle-${mander.id_mander}`}
                    className={`block cursor-pointer w-12 h-5 rounded-full ${mander.isactive_user ? 'bg-blue-500' : 'bg-gray-300'}`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${mander.isactive_user ? 'translate-x-7' : 'translate-x-0'} `}
                    ></span>
                  </label>
                  <span className='ml-2'>{mander.isactive_user ? "Activo" : "Bloqueado"}</span>
                </div>
                <p className="text-sm mb-1">
                  <span className="font-bold">Celular:</span> {mander['phone_user']}
                </p>
                <div>
                  {mander['vehicles']
                    .filter(vehicle => vehicle.isactive_vehicle)
                    .map((vehicle, index) => (
                      <div key={index}>
                        <span className="font-bold">Vehículo:</span>
                        {vehicle.type_vehicle === 'car' ? (
                          <span>
                            <FaCar size={24} />
                            <span> {vehicle.plate_vehicle}</span>
                          </span>
                        ) : (
                          <span>
                            <FaMotorcycle size={24} />
                            <span> {vehicle.plate_vehicle}</span>
                          </span>
                        )}
                      </div>
                    ))}
                </div>
                <div>
                  <span className="font-bold"> Estado:</span>
                  <p className="text-sm mb-1">
                    <FaLightbulb size={24} className={mander.isactive_mander ? 'text-green-500' : 'text-red-500'} />
                  </p>
                </div>
              </div>
              <div className="flex justify-between py-2 mt-auto">
                <button
                  className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-2 rounded"
                  onClick={() => handleEdit(mander.id_mander, mander.id_user)}
                >
                  Editar
                </button>
                <div className="relative inline-block">
                  <button
                    className={`bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-2 rounded ${selectedRegisterMander === mander.id_user ? 'bg-green-700' : ''}`}
                    onClick={() => handleRegister(mander.id_user)}
                  >
                    Registrar
                  </button>
                  {selectedRegisterMander === mander.id_user && (
                    <div className="absolute right-0 mt-2 w-48 bg-sky-700 border border-sky-500 rounded-md shadow-lg">
                      <div className="py-1">
                        <button
                          className={`block px-4 py-2 text-sm text-white w-full text-left ${selectedRegister === 'vehicle' ? 'bg-blue-700' : ''}`}
                          onClick={() => handleRegisterSelect('vehicle')}
                        >
                          Vehículo
                        </button>
                        <button
                          className={`block px-4 py-2 text-sm text-white w-full text-left ${selectedRegister === 'document' ? 'bg-blue-700' : ''}`}
                          onClick={() => handleRegisterSelect('document')}
                        >
                          Documento
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-2 rounded"
                  onClick={() => handleDetail(mander.id_user)}
                >
                  Detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default MandersList;

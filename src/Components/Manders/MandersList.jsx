import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManderForm from '../Forms/ManderForm';
import UpdateManderForm from '../Forms/UpdateManderForm';
import VehicleForm from '../Forms/VehicleForm'

function MandersList() {
  const [manders, setManders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredManders, setFilteredManders] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedMander, setSelectedMander] = useState(null); 
  const [showVehicleForm, setShowVehicleForm] = useState(false);

  useEffect(() => {
    fetchManders();
  }, []);

  const fetchManders = async () => {
    try {
      const response = await axios.get('https://manders.azurewebsites.net/api/mander/');
      const mandersWithUserInfo = await Promise.all(
        response.data.map(async (mander) => {
          const userResponse = await axios.get(`https://manders.azurewebsites.net/api/user/${mander.user_id_user}/`);
          return {
            ...mander,
            user: userResponse.data,
          };
        })
      );
      setManders(mandersWithUserInfo);
      setFilteredManders(mandersWithUserInfo);
    } catch (error) {
      console.error('Error fetching manders:', error);
    }
  };

  const handleEditMander = (user) => { // Recibe el objeto de mandadero completo
    setSelectedMander(user); // Establece el mandadero seleccionado
    setShowUpdateForm(true);
  };

  const handleUpdate = () => {
    fetchManders();
    setShowUpdateForm(false);
  };

  /*const handleDeleteMander = async (manderId) => {
    try {
      await axios.delete(`https://manders.azurewebsites.net/api/mander/${manderId}/`);
      fetchManders();
    } catch (error) {
      console.error('Error deleting mander:', error);
    }
  };*/

  const handleSearchMander = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = manders.filter(mander =>
      mander.user.name_user.toLowerCase().includes(searchTerm) ||
      mander.user.lastname_user.toLowerCase().includes(searchTerm) ||
      mander.user.phone_user.toLowerCase().includes(searchTerm)
    );
    setFilteredManders(filtered);

    if (filtered.length === 0) {
      setAlertMessage("Mandadero doesn't exist");
    } else {
      setAlertMessage('');
    }
  };

  const handleCreateMander = () => {
    setShowCreateForm(true);
  };

  const handleCreate = () => {
    fetchManders();
    setShowCreateForm(false);
  };

  const handleCreateVehicle = () => {
    setShowVehicleForm(true); 
  };

  return (
    <div className="bg-slate-400 text- min-h-screen">
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-5">Mander List</h2>
      {alertMessage && <div className="text-red-500">{alertMessage}</div>}
      {showVehicleForm ? (
        <VehicleForm onCreate={handleCreateVehicle} onClose={() => setShowVehicleForm(false)} />
      ) : showUpdateForm ? (
        <UpdateManderForm manderId={selectedMander} onUpdate={handleUpdate} onClose={() => setShowUpdateForm(false)} />
      ) : showCreateForm ? (
        <ManderForm onCreate={handleCreate} onClose={() => setShowCreateForm(false)} />
      ) : (
        <>
          <div className="flex mb-4">
            <input
              type="text"
              className="flex-1 border-2 border-gray-300 bg-white h-10 px-6 rounded-lg text-sm focus:outline-none"
              placeholder="Search..."
              onChange={handleSearchMander}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={handleCreateMander}
            >
              New Mander
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            
            {filteredManders.map((mander, index) => (
              <div key={index} className="bg-slate-300 rounded-lg shadow-md p-2 border border-black ">
                <img
                  src={mander.image_mander}
                  alt={`Image of ${mander.user.name_user} ${mander.user.lastname_user}`}
                  className="w-32 h-auto mb-2 rounded-lg mx-auto"
                />
                <p className="text-sm mb-1"><span className="font-bold">User:</span> {mander.user.name_user} {mander.user.lastname_user}</p>
                <p className="text-sm mb-1"><span className="font-bold">Email:</span> {mander.user.email_account}</p>
                <p className="text-sm mb-1"><span className="font-bold">Phone:</span> {mander.user.phone_user}</p>
                <p className="text-sm mb-1"><span className="font-bold">Has Car:</span> {mander.ishavecar_mander ? 'Yes' : 'No'}</p>
                <p className="text-sm mb-1"><span className="font-bold">Has Motorcycle:</span> {mander.ishavemoto_mander ? 'Yes' : 'No'}</p>
                <p className="text-sm mb-1"><span className="font-bold">Is Active:</span> {mander.isactive_mander ? 'Yes' : 'No'}</p>
                <p className="text-sm mb-1"><span className="font-bold">Is Validated:</span> {mander.isvalidate_mander ? 'Yes' : 'No'}</p>
                <p className="text-sm mb-1"><span className="font-bold">Address:</span> {mander.address_mander}</p>
                <p className="text-sm mb-1"><span className="font-bold">CC:</span> {mander.cc_mander}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleEditMander(mander.id_mander)}
                >
                  Edit
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleCreateVehicle()}
                >
                  Vehicle
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      </div>
    </div>
  );
  
  
}

export default MandersList;

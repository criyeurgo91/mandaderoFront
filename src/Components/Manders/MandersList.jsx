import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { axiosGet } from '../../Logic/Apihelpers';
import apiUrl from '../../config/apiConfig';


function MandersList() {
  const [manders, setManders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredManders, setFilteredManders] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedManderId, setSelectedManderId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRegister, setSelectedRegister] = useState('')
  const [selectedRegisterMander, setSelectedRegisterMander] = useState('')
  const navigate = useNavigate()
  

  useEffect(() => {
    
    axiosGet(`${apiUrl}/api/getlistmanders/`).then((response)=>{
      setManders(response)
      console.log(response);
      setFilteredManders(response);
    })
  }, []);


  const handleSearchMander = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = manders.filter(mander =>
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

  //funcion para crear mandadero
  const handleNewMander = () => {
    navigate('profilemander')
  };

  const handleEdit = (manderId, userId, accountId) => {
    if (selectedManderId === manderId) {
      setSelectedOption('');
      setSelectedManderId(null);
    } else {
      setSelectedManderId(manderId);
      setSelectedUserId(userId)
      setSelectedAccountId(accountId)
      setSelectedOption(''); 
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === 'updateAccount') {
      navigate(`updateaccountmander/${selectedAccountId}`);
    } else if (option === 'updateProfile') {
      navigate(`updateuser/${selectedUserId}`);
    } else if (option === 'updateMander'){
      navigate(`updatemander/${selectedManderId}`)
    }
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


  return (
    <div className="bg-stone-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-5">Mander List</h2>
      {alertMessage && <div className="text-red-500">{alertMessage}</div>}
          <div className="flex mb-4">
            <input
              type="text"
              className="w-1/2 border-2 border-gray-500 bg-black h-10 px-6 rounded-lg text-sm focus:outline-none"
              placeholder="Search..."
              onChange={handleSearchMander}
            />
            <button
              className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={handleNewMander}
            >
              New Mander
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            
          {filteredManders.map((mander, index) => (
          <div key={index} className="bg-stone-700 rounded-lg shadow-md p-2 border border-black ">
          <p className="text-sm mb-1"><span className="font-bold">Mander:</span> {mander['name_user']} {mander['lastname_user']}</p>
          <p className="text-sm mb-1"><span className="font-bold">CC:</span> {mander['cc_mander']}</p>
          <p className="text-sm mb-1"><span className="font-bold">Address:</span> {mander['address_mander']}</p>
          <p className="text-sm mb-1"><span className="font-bold">Phone:</span> {mander['phone_user']}</p>
          <div>
          <span className='font-bold'> Registered Vehicle:</span>
          <p className="text-sm mb-1"><span className="font-bold">Car:</span> {mander['ishavecar_mander'] ? 'Yes' : 'No'}</p>
          <p className="text-sm mb-1"><span className="font-bold">Bike:</span> {mander['ishavemoto_mander'] ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <span className='font-bold'> Status:</span>
          <p className="text-sm mb-1"><span className="font-bold">Active:</span> {mander['isactive_mander'] ? 'Yes' : 'No'}</p>
          <p className="text-sm mb-1"><span className="font-bold">Validated:</span> {mander['isvalidate_mander'] ? 'Yes' : 'No'}</p>
        </div>
        <div className='flex justify-start py-2'>
        <button
                        className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={() => handleEdit(mander.id_mander, mander.id_user, mander.id_account)}
                      >
                        Edit
                      </button>
                      {selectedManderId === mander.id_mander && (
                        <div className="ml-2">
                          <select
                            className="bg-gray-700 text-white px-2 py-1 rounded"
                            value={selectedOption}
                            onChange={(e) => handleOptionSelect(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="updateAccount">Update Account</option>
                            <option value="updateProfile">Update Profile</option>
                            <option value="updateMander">Update Mander</option>
                          </select>
                        </div>
                      )}
                      <button
                        className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={() => handleRegister( mander.id_user)}
                      >
                        Register
                      </button>
                      {selectedRegisterMander === mander.id_user && (
                        <div className="ml-2">
                          <select
                            className="bg-gray-700 text-white px-2 py-1 rounded"
                            value={selectedOption}
                            onChange={(e) => handleRegisterSelect(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="vehicle">Vehicle</option>
                            <option value="document">Document</option>
                          </select>
                        </div>
                      )}
        </div>
      </div>
    ))}


          </div>
      
      </div>
    </div>
  );
  
  
}

export default MandersList;

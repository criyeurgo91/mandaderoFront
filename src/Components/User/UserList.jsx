import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosGet, axiosPatch } from '../../Logic/Apihelpers';
import '../../Components/User/Index.css';
import apiUrl from '../../config/apiConfig';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null)
  const [selectedOption, setSelectedOption] = useState('');
  const [userIsActive, setUserIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosGet(`${apiUrl}/api/getlistuser/`)
      .then(async (response) => {
        console.log(response);
        
        const usersWithIsActive = await Promise.all(response.map(async (user) => {
          try {
            const userResponse = user.isactive_user;
            return { ...user, isactive_user: userResponse };
          } catch (error) {
            console.error(`Error fetching user state ${user.id_user}:`, error);
            return user;
          }
        }));
        
        // Solo listar usuarios que no sean mandaderos
        const filteredUsers = usersWithIsActive.filter(user => !user.ismander_user && !user.isadmin_user);
  
        setUsers(filteredUsers);
        setFilteredUsers(filteredUsers);
        
        if (filteredUsers.length > 0) {
          setUserIsActive(filteredUsers[0].isactive_user || false);
        }
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  }, []);
  
  
  
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = users.filter(
      (user) =>
        user.name_user.toLowerCase().includes(searchTerm) ||
        user.lastname_user.toLowerCase().includes(searchTerm) ||
        user.phone_user.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
    setAlertMessage(filtered.length === 0 ? "User doesn't exist" : '');
  };

  const handleEdit = (userId) => {
        setSelectedUserId(userId);
        navigate(`updateprofile/${userId}`)
  };

  const handleNewUser = () => {
    navigate('profile');
  };

  const handleToggleActive = async (userId, isActive) => {
    try {
      // Buscar el usuario en la lista por su ID de usuario
      const userToUpdate = users.find(user => user.id_user === userId);
      if (!userToUpdate) {
        console.error(`User with ID ${userId} not found.`);
        return;
      }
  
      const updatedUser = {
        isactive_user: !isActive,
      };
  
      await axiosPatch(`${apiUrl}/api/user/${userId}/`, updatedUser);
  
      // Actualizar el estado local después de que se haya confirmado la actualización en el servidor
      const updatedUsers = users.map(user =>
        user.id_user === userId ? { ...user, isactive_user: !isActive } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error('Error toggling user active state:', error);
      alert('Failed to toggle user active state');
    }
  };
  
  
  

  return (
    <div className="bg-sky-50 text-white min-h-screen">
      <div className="container mx-auto px-4 ">
        <h2 className="text-2xl font-bold mb-5 py-3 text-sky-800">Usuarios</h2>
        <div className="container mx-auto px-4 ">
          <div className="flex mb-4">
            <input
              type="text"
              className="w-1/2 border-2 border-gray-700 bg-sky-950 h-10 px-5 rounded-lg text-sm focus:outline-none"
              placeholder="Buscar..."
              onChange={handleSearch}
            />
            <button
              className="bg-green-950 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={handleNewUser}
            >
              Registrar
            </button>
          </div>
          {alertMessage && <div className="text-red-950">{alertMessage}</div>}
          <div className='table-container text-sky-800'>
          <table className="w-full border-collapse border">
            <thead className="bg-sky-950 text-white">
              <tr>
                <th className="px-4 py-2 border">Correo</th>
                <th className="px-4 py-2 border">Nombre</th>
                <th className="px-4 py-2 border">Apellido</th>
                <th className="px-4 py-2 border">Celular</th>
                <th className="px-4 py-2 border">Accion</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id_user} className="border border-white ">
                  <td className="border px-4 py-2">
                    {user.email_account}
                    <div className="ml-2 py-2 relative">
                      <input
                        type="checkbox"
                        checked={user.isactive_user}
                        onChange={() => handleToggleActive(user.id_user, user.isactive_user)}
                        id={`toggle-${user.id_user}`}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`toggle-${user.id_user}`}
                        className={`block cursor-pointer w-12 h-5 rounded-full ${user.isactive_user ? 'bg-blue-500' : 'bg-gray-300'}`}
                      >
                        <span
                          className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${user.isactive_user ? 'translate-x-7' : 'translate-x-0'} `}
                        ></span>
                      </label>
                      <span className='ml-2'>{user.isactive_user ? "Activo" : "Bloqueado"}</span>
                    </div>
                  </td>
                  <td className="border px-4 py-2">{user.name_user}</td>
                  <td className="border px-4 py-2">{user.lastname_user}</td>
                  <td className="border px-4 py-2">{user.phone_user}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center">
                      <button
                        className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={() => handleEdit(user.id_user)}
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

export default UserList;

import { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserForm from '../Forms/UpdateUserForm';
import UserForm from '../Forms/UserForm';
import  '../../Components/User/Index.css'
import apiUrl from '../../config/apiConfig';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isMander, setIsMander] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/user/`);
      const usersWithAccountInfo = await Promise.all(
        response.data.map(async (user) => {
          const accountResponse = await axios.get(`${apiUrl}/api/account/${user.account_id_account}/`);
          return {
            ...user,
            email: accountResponse.data.email_account,
          };
        })
      );
      setUsers(usersWithAccountInfo);
      setFilteredUsers(usersWithAccountInfo);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => { // Recibe el objeto de usuario completo
    setSelectedUser(user); // Establece el usuario seleccionado
    setShowUpdateForm(true);
  };

  const handleUpdate = () => {
    fetchUsers();
    setShowUpdateForm(false);
  };

  /*const handleDelete = async (userId) => {
    try {
      await axios.delete(`${apiUrl}/api/user/${userId}/`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };*/

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = users.filter(user =>
      user.name_user.toLowerCase().includes(searchTerm) ||
      user.lastname_user.toLowerCase().includes(searchTerm) ||
      user.phone_user.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);

    if (filtered.length === 0) {
      setAlertMessage("User doesn't exist");
    } else {
      setAlertMessage('');
    }
  };

  const handleCreateUser = () => {
    setShowCreateForm(true);
  };

  const handleCreate = () => {
    fetchUsers();
    setShowCreateForm(false);
  };

  return (
    <div className="bg-white text- min-h-screen">
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-5">User List</h2>
      {showUpdateForm ? (
        <UpdateUserForm userId={selectedUser} onUpdate={handleUpdate} onClose={() => setShowUpdateForm(false)} /> // Cambiar a userId={selectedUser}
      ) : (
        <>
          {showCreateForm ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <UserForm onCreate={handleCreate} onClose={() => setShowCreateForm(false)} />
            </div>
          ) : (
            <div className="container mx-auto px-4 py-8">
              <div className="flex mb-4">
                <input
                  type="text"
                  className="w-1/2 border-2 border-gray-700 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={handleCreateUser}
                >
                  New User
                </button>
              </div>
              {alertMessage && <div className="text-red-500">{alertMessage}</div>}
              <table className="w-full border-collapse border border-black custom-table">
                <thead className="bg-gray-500">
                  <tr>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Lastname</th>
                    <th className="px-4 py-2 border">Phone</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id_user} className='border border-black'>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2">{user.name_user}</td>
                      <td className="border px-4 py-2">{user.lastname_user}</td>
                      <td className="border px-4 py-2">{user.phone_user}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                          onClick={() => handleEdit(user.id_user)}
                        >
                          Edit
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

export default UserList;

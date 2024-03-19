import  { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserForm from '../Forms/UpdateUserForm';
import UserForm from '../Forms/UserForm';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get('http://manders.azurewebsites.net/api/user/');
      const usersWithAccountInfo = await Promise.all(
        response.data.map(async (user) => {
          const accountResponse = await axios.get(`http://manders.azurewebsites.net/api/account/${user.account_id_account}/`);
=======
      const response = await axios.get('https://manders.azurewebsites.net/api/user/');
      const usersWithAccountInfo = await Promise.all(
        response.data.map(async (user) => {
          const accountResponse = await axios.get(`https://manders.azurewebsites.net/api/account/${user.account_id_account}/`);
>>>>>>> 3893b8f1328d4dd878f13bd9f60d9a231ddc5091
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

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    setShowUpdateForm(true);
  };

  const handleUpdate = () => {
    fetchUsers();
    setShowUpdateForm(false);
  };

  const handleDelete = async (userId) => {
    try {
<<<<<<< HEAD
      await axios.delete(`http://manders.azurewebsites.net/api/user/${userId}/`);
=======
      await axios.delete(`https://manders.azurewebsites.net/api/user/${userId}/`);
>>>>>>> 3893b8f1328d4dd878f13bd9f60d9a231ddc5091
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {showUpdateForm ? (
        <UpdateUserForm userId={selectedUserId} onUpdate={handleUpdate} onClose={() => setShowUpdateForm(false)} />
      ) : (
        <>
          {showCreateForm ? (
            <UserForm onCreate={handleCreate} onClose={() => setShowCreateForm(false)} />
          ) : (
            <div className="container mx-auto px-4 py-8">
              <div className="flex mb-4">
                <input
                  type="text"
                  className="flex-1 border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
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
              <table className="w-full border-collapse border border-gray-300 ">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Lastname</th>
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id_user} className='border border-gray-300'>
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
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          onClick={() => handleDelete(user.id_user)}
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
}


export default UserList;

import  { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserForm from '../Forms/UpdateUserForm';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/');
      const usersWithAccountInfo = await Promise.all(
        response.data.map(async (user) => {
          const accountResponse = await axios.get(`http://127.0.0.1:8000/api/account/${user.account_id_account}/`);
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

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/${userId}/`);
      // Actualizar la lista de usuarios después de eliminar
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

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {showUpdateForm ? (
        <UpdateUserForm userId={selectedUserId} />
      ) : (
        <div className="overflow-x-auto">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md mb-4"
            placeholder="Search..."
            onChange={handleSearch}
          />
          {alertMessage && <div className="text-red-500">{alertMessage}</div>}
          <table className="table-auto">
            <thead>
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
                <tr key={user.id_user}>
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
    </div>
  );
}

export default UserList;

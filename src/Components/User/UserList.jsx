import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosGet } from '../../Logic/Apihelpers';
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
  const navigate = useNavigate();

  useEffect(() => {
    axiosGet(`${apiUrl}/api/getlistuser/`).then((response) => {
      const filteredUsers = response.filter((user) => !user.ismander_user);
      setUsers(filteredUsers);
      setFilteredUsers(filteredUsers);
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

  const handleEdit = (userId, accountId) => {
    if (selectedUserId === userId) {
        setSelectedUserId(null);
        setSelectedAccountId(null);
        setSelectedOption('');
    } else {
        setSelectedUserId(userId);
        setSelectedAccountId(accountId);
        setSelectedOption('');
    }
};

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === 'updateAccount') {
      navigate(`updateaccount/${selectedAccountId}`);
    } else if (option === 'updateProfile') {
      navigate(`updateprofile/${selectedUserId}`);
    }
  };

  const handleNewUser = () => {
    navigate('profile');
  };

  return (
    <div className="bg-stone-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-5">User List</h2>
        <div className="container mx-auto px-4 py-8">
          <div className="flex mb-4">
            <input
              type="text"
              className="w-1/2 border-2 border-gray-700 bg-black h-10 px-5 rounded-lg text-sm focus:outline-none"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <button
              className="bg-green-950 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={handleNewUser}
            >
              New User
            </button>
          </div>
          {alertMessage && <div className="text-red-950">{alertMessage}</div>}
          <table className="w-full border-collapse border border-black custom-table">
            <thead className="bg-stone-600">
              <tr>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Lastname</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id_user} className="border border-black">
                  <td className="border px-4 py-2">{user.email_account}</td>
                  <td className="border px-4 py-2">{user.name_user}</td>
                  <td className="border px-4 py-2">{user.lastname_user}</td>
                  <td className="border px-4 py-2">{user.phone_user}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center">
                      <button
                        className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={() => handleEdit(user.id_user, user.id_account)}
                      >
                        Edit
                      </button>
                      {selectedUserId === user.id_user && (
                        <div className="ml-2">
                          <select
                            className="bg-gray-700 text-white px-2 py-1 rounded"
                            value={selectedOption}
                            onChange={(e) => handleOptionSelect(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="updateAccount">Update Account</option>
                            <option value="updateProfile">Update Profile</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;

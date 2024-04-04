import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

function SearchUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/user/`);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterUsers(event.target.value);
  };

  const filterUsers = (query) => {
    if (!query) {
      setFilteredUsers(users);
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const filtered = users.filter(user => {
      return (
        user.name_user.toLowerCase().includes(normalizedQuery) ||
        user.lastname_user.toLowerCase().includes(normalizedQuery) ||
        user.phone_user.toLowerCase().includes(normalizedQuery)
      );
    });
    setFilteredUsers(filtered);
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Search Users</h2>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded-md mb-4"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id_user}>
            {user.name_user} {user.lastname_user} - {user.phone_user}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchUser;

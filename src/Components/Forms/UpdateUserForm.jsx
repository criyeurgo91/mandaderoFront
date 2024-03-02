import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateUserForm({ userId }) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
      const userData = response.data;
      setName(userData.name_user);
      setLastname(userData.lastname_user);
      setPhone(userData.phone_user);
      setIsAdmin(userData.isadmin_user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name_user', name);
      formData.append('lastname_user', lastname);
      formData.append('phone_user', phone);
      formData.append('isadmin_user', isAdmin);
      if (image) {
        formData.append('image_user', image);
      }

      await axios.put(`http://127.0.0.1:8000/api/user/${userId}/`, formData);

      setMessage('User updated successfully.');
      console.log('User updated successfully.');
    } catch (error) {
      setMessage('Error updating user. Please try again.');
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Update User</h2>
      {message && (
        <div className={`bg-${message.includes('successfully') ? 'green' : 'red'}-100 border border-${message.includes('successfully') ? 'green' : 'red'}-400 text-${message.includes('successfully') ? 'green' : 'red'}-700 px-4 py-3 mb-4 rounded`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
            Lastname:
          </label>
          <input
            id="lastname"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone:
          </label>
          <input
            id="phone"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image:
          </label>
          <input
            id="image"
            type="file"
            className="w-full px-3 py-2 border rounded-md"
            onChange={(event) => setImage(event.target.files[0])}
            accept="image/*"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isAdmin}
              onChange={(event) => setIsAdmin(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is Admin?</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateUserForm;

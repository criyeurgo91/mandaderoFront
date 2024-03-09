import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateUserForm({ userId, onUpdate, onClose }) {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [isMander, setIsMander] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
      setUser(response.data);
      setName(response.data.name_user);
      setLastname(response.data.lastname_user);
      setPhone(response.data.phone_user);
      setIsMander(response.data.ismander_user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = {
        account_id_account: user.account_id_account,
        image_user: image,
        name_user: name,
        lastname_user: lastname,
        phone_user: phone,
        ismander_user: isMander,
      };

      const response = await axios.put(`http://127.0.0.1:8000/api/user/${userId}/`, userData);

      setMessage('User updated successfully.');
      console.log('User updated successfully.', response.data);

      onUpdate();
      onClose();
    } catch (error) {
      setMessage('Failed to update user. Please try again.');
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
      {user && (
        <form onSubmit={handleSubmit}>
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
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isMander}
                onChange={(event) => setIsMander(event.target.checked)}
              />
              <span className="ml-2 text-gray-700">Is Mander?</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateUserForm;

import { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

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
      const response = await axios.get(`${apiUrl}/api/user/${userId}`);
      setUser(response.data);
      if (response.data) {
        setName(response.data.name_user);
        setLastname(response.data.lastname_user);
        setPhone(response.data.phone_user);
        setIsMander(response.data.ismander_user);
        // Set the image URL if available
        setImage(response.data.image_user);
      }
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

      const formData = new FormData();
      formData.append('image_user', image);
      for (const key in userData) {
        formData.append(key, userData[key]);
      }

      await axios.put(`${apiUrl}/api/user/${userId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('User updated successfully.');
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
            {/* Display the image if available */}
            {image && (
              <img src={image} alt="User Avatar" className="w-24 h-24 mb-2 object-cover rounded-full" />
            )}
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-20 mb-2"
          >
            Update
          </button>
          <button
            type="reset"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateUserForm;

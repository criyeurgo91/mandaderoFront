import  { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateServiceForm({ serviceId, onUpdate, onClose }) {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState(null); // Nuevo estado para manejar la imagen
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchServiceData();
  }, [serviceId]);

  const fetchServiceData = async () => {
    try {
      const response = await axios.get(`https://manders.azurewebsites.net/api/service/${serviceId}`);
      setName(response.data.name_service);
      setDetail(response.data.detail_service);
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name_service', name);
      formData.append('detail_service', detail);
      formData.append('image_service', image); // Agregar la imagen al FormData

      const response = await axios.put(`https://manders.azurewebsites.net/api/service/${serviceId}/`, formData);

      setMessage('Service updated successfully.');
      console.log('Service updated successfully.', response.data);

      onUpdate();
      onClose();
    } catch (error) {
      setMessage('Failed to update service. Please try again.');
      console.error('Error updating service:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Update Service</h2>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detail">
            Detail:
          </label>
          <input
            id="detail"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
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

export default UpdateServiceForm;

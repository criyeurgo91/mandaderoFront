import { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

function UpdateServiceForm({ serviceId, onUpdate, onClose }) {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    fetchServiceData();
  }, [serviceId]);

  const fetchServiceData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/service/${serviceId}`);
      setName(response.data.name_service);
      setDetail(response.data.detail_service);
      setCurrentImage(response.data.image_service);
      setVisible(response.data.isvisible_service);
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
      formData.append('isvisible_service', visible)
      
      if (image) {
        formData.append('image_service', image);
      } else if (currentImage) {
        const response = await fetch(currentImage);
        const blob = await response.blob();
        const file = new File([blob], 'current_image.jpg');
  
        formData.append('image_service', file);
      }

      const response = await axios.put(`${apiUrl}/api/service/${serviceId}/`, formData);

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
    <div className="max-w-sm mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Actualizar servicio</h2>
      {message && (
        <div className={`bg-${message.includes('successfully') ? 'green' : 'red'}-100 border border-${message.includes('successfully') ? 'green' : 'red'}-400 text-${message.includes('successfully') ? 'green' : 'red'}-700 px-4 py-3 mb-4 rounded`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            Nombre:
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
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="detail">
            Detalle:
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
        {currentImage && !image && (
        <div className="mb-4">
          <img src={currentImage} alt="Current Image" className="mb-2" style={{ maxWidth: '50%' }} />
          <p className="text-white text-sm">Current Image</p>
        </div>
        )}
        {image && (
          <div className="mb-4">
            <img src={URL.createObjectURL(image)} alt="Selected Image" className="mb-2" style={{ maxWidth: '50%' }} />
            <p className="text-white text-sm">Selected Image</p>
          </div>
        )}
        <label htmlFor="image" className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Editar
        </label>
        <input
          id="image"
          type="file"
          className="hidden"
          onChange={(event) => {
            const selectedImage = event.target.files[0];
            setImage(selectedImage);
            setCurrentImage(URL.createObjectURL(selectedImage));
          }}
          accept="image/*"
        />
      </div>
      <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
          
          <input
            type="checkbox"
            checked={visible}
            onChange={(event) => setVisible(event.target.checked)}
          />
          <span className="ml-2 text-white">Visible</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-20 mb-2"
        >
          Actualizar
        </button>
        <button
          type="reset"
          className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={onClose}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default UpdateServiceForm;

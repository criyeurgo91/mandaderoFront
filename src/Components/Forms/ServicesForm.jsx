import  { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

function ServicesForm({ onCreate, onClose }) {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [ visible, setVisible] = useState(true)
  const [previewImage, setPreviewImage] = useState(null)

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name_service', name);
      formData.append('detail_service', detail);
      formData.append('image_service', image);
      formData.append('isvisible_service', visible)

      await axios.post(`${apiUrl}/api/service/`, formData);

      setMessage('Service created successfully.');
      setName('');
      setDetail('');
      setImage(null);
      setVisible(true)

      onCreate();
      onClose();
    } catch (error) {
      setMessage('Error creating service. Please try again.');
      console.error('Error creating service:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-sky-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Crear Nuevo Servicio</h2>
      {message && (
        <div className={`bg-${message.includes('successfully') ? 'green' : 'red'}-100 border border-${message.includes('successfully') ? 'green' : 'red'}-400 text-${message.includes('successfully') ? 'green' : 'red'}-700 px-4 py-3 mb-4 rounded`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
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
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="detail">
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
          <label className="block text-white text-sm font-bold mb-2" htmlFor="image">
            Image:
          </label>
          <input
            id="image"
            type="file"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleImageChange}
            accept="image/*"
          />
          {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-40" />}
        </div>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="detail">
          
          <input
            id="visible"
            type="checkbox"
            className="form-checkbox"
            value={visible}
            onChange={(event) => setVisible(event.target.value)}
          />
          <span className="ml-2 text-white">Visible</span>
          </label>
        </div>
        <div className='flex items-center justify-between'>
        <button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white font-bold  rounded px-2 py-2">
          Crear
        </button>
        <button type="reset" className="bg-red-900 hover:bg-red-700 text-white font-bold  rounded px-2 py-2"
        onClick={onClose}
        >
          Cancelar
        </button>
        </div>
        
      </form>
    </div>
  );
}

export default ServicesForm;

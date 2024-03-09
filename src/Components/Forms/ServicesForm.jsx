import  { useState, useEffect } from 'react';
import axios from 'axios';

function ServicesForm({ onCreate, onClose }) {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Aquí puedes realizar cualquier acción que necesites cuando se monte el componente
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/service/', {
        name: name,
        detail: detail,
        image: image,
      });

      setMessage('Service created successfully.');

      // Limpiar los campos después de enviar el formulario
      setName('');
      setDetail('');
      setImage(null);

      // Llamar a la función onCreate para actualizar la lista de usuarios
      onCreate();

      // Llamar a la función onClose para cerrar el formulario después de una creación exitosa
      onClose();

    } catch (error) {
      setMessage('Error creating service. Please try again.');
      console.error('Error creating service:', error);
    }
    return (
        <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Create Service</h2>
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Detail">
                  Detail:
                </label>
                <input
                  id="Detail"
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
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </form>
        </div>
      );
    }
}

    export default ServicesForm;
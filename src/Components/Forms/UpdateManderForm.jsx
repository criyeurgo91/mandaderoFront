import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

function UpdateManderForm({ manderId, onUpdate, onClose }) {
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [cc, setCc] = useState('');
  const [ishavecar, setIshavecar] = useState(false);
  const [ishavemoto, setIshavemoto] = useState(false);
  const [isactivemander, setIsactivemander] = useState(false);
  const [isvalidatemander, setIsvalidatemander] = useState(false);
  const [message, setMessage] = useState('');
  const [userIdUser, setUserIdUser] = useState('');
  const [currentImage, setCurrentImage] = useState(null); // Agregar estado para almacenar la imagen actual

  useEffect(() => {
    // Obtener los datos del mandadero al cargar el componente
    axios.get(`${apiUrl}/api/mander/${manderId}`)
      .then(response => {
        const manderData = response.data;
        setAddress(manderData.address_mander);
        setCc(manderData.cc_mander);
        setIshavecar(manderData.ishavecar_mander);
        setIshavemoto(manderData.ishavemoto_mander);
        setIsactivemander(manderData.isactive_mander);
        setIsvalidatemander(manderData.isvalidate_mander);
        setUserIdUser(manderData.user_id_user);
        setCurrentImage(manderData.image_mander); // Actualizar el estado de la imagen actual
      })
      .catch(error => {
        console.error('Error fetching Mander data:', error);
      });
  }, [manderId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('user_id_user', userIdUser);
      formData.append('image_mander', image);
      formData.append('address_mander', address);
      formData.append('cc_mander', cc);
      formData.append('ishavecar_mander', ishavecar);
      formData.append('ishavemoto_mander', ishavemoto);
      formData.append('isactive_mander', isactivemander);
      formData.append('isvalidate_mander', isvalidatemander);

      await axios.put(`${apiUrl}/api/mander/${manderId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Especificar que se envía una imagen
        },
      });

      setMessage('Mander updated successfully.');

      onUpdate(); // Llamar a la función onUpdate para actualizar la lista de Manders
      onClose(); // Llamar a la función onClose para cerrar el formulario después de una actualización exitosa

    } catch (error) {
      setMessage('Error updating Mander. Please try again.');
      console.error('Error updating Mander:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Update Mander</h1>
      {message && (
        <div className={`bg-${message.includes('successfully') ? 'green' : 'red'}-100 border border-${message.includes('successfully') ? 'green' : 'red'}-400 text-${message.includes('successfully') ? 'green' : 'red'}-700 px-4 py-3 mb-4 rounded`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        {/* Campos para la imagen */}
        {currentImage && (
          <div className="mb-4">
            <p className="font-bold mb-2">Current Image:</p>
            <img src={currentImage} alt="Current Mander Image" className="w-full h-auto" />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_mander">
            Image:
          </label>
          <input
            id="image_mander"
            type="file"
            className="w-full px-3 py-2 border rounded-md"
            onChange={(event) => setImage(event.target.files[0])}
            accept="image/*"
          />
        </div>

        {/* Campos para el mandadero */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cc_mander">
            Document:
          </label>
          <input
            id="cc_mander"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={cc}
            onChange={(event) => setCc(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addresss_mander">
            Address:
          </label>
          <input
            id="address_mander"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id='ishavemoto'
              name='ishavemoto'
              className="form-checkbox"
              checked={ishavemoto}
              onChange={(event) => setIshavemoto(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is have a Bike?</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id='ishavecar'
              name='ishavecar'
              className="form-checkbox"
              checked={ishavecar}
              onChange={(event) => setIshavecar(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is have a Car?</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id='isactivemander'
              name='isactivemander'
              className="form-checkbox"
              checked={isactivemander}
              onChange={(event) => setIsactivemander(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is Active?</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              id='isvalidated'
              name='isvalidated'
              className="form-checkbox"
              checked={isvalidatemander}
              onChange={(event) => setIsvalidatemander(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is Validated?</span>
          </label>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-20 mb-2">
          Update Mander
        </button>
        <button type="reset" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateManderForm;

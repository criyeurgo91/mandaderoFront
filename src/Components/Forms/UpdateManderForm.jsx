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
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
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
        setCurrentImage(manderData.image_mander);
      })
      .catch(error => {
        console.error('Error fetching Mander data:', error);
      });
  }, [manderId]);

  const handleChangeImage = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    const reader = new FileReader();
    reader.onload = () => {
      setCurrentImage(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('user_id_user', userIdUser);
      formData.append('address_mander', address);
      formData.append('cc_mander', cc);
      formData.append('ishavecar_mander', ishavecar);
      formData.append('ishavemoto_mander', ishavemoto);
      formData.append('isactive_mander', isactivemander);
      formData.append('isvalidate_mander', isvalidatemander);
      
      
    if (image) {
      formData.append('image_mander', image);
    } else if (currentImage) {
      const response = await fetch(currentImage);
      const blob = await response.blob();
      const file = new File([blob], 'current_image.jpg');

      formData.append('image_mander', file);
    }
  
      await axios.put(`${apiUrl}/api/mander/${manderId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setMessage('Mander updated successfully.');
  
      onUpdate();
      onClose();
    } catch (error) {
      setMessage('Error updating Mander. Please try again.');
      console.error('Error updating Mander:', error);
    }
  };
  

  return (
    <div className="max-w-sm mx-auto p-6 bg-black rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Update Mander</h1>
      {message && (
        <div className={`bg-${message.includes('successfully') ? 'green' : 'red'}-100 border border-${message.includes('successfully') ? 'green' : 'red'}-400 text-${message.includes('successfully') ? 'green' : 'red'}-700 px-4 py-3 mb-4 rounded`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div className="flex flex-col mb-4">
          {currentImage && (
            <div className="mb-4">
              <p className="font-bold mb-2">Avatar:</p>
              <img src={currentImage} alt="Mander Avatar" className="w-24 h-24 mb-2 object-cover rounded-full" />
            </div>
          )}
          {image && !currentImage && (
            <div className="mb-4">
              <p className="font-bold mb-2">Selected Image:</p>
              <img src={URL.createObjectURL(image)} alt="Selected Image" className="w-24 h-24 mb-2 object-cover rounded-full" />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="image" className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </label>
            <input
              id="image"
              type="file"
              className="hidden"
              onChange={handleChangeImage}
              accept="image/*"
            />
          </div>
        </div>

        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="cc_mander">
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
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="addresss_mander">
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
        <div>
          <span className='font-bold'>
            Type Vehicle:
          </span>
        <div className="mb-4 mt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              id='ishavemoto'
              name='ishavemoto'
              className="form-checkbox"
              checked={ishavemoto}
              onChange={(event) => setIshavemoto(event.target.checked)}
            />
            <span className="ml-2 text-white">Bike</span>
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
            <span className="ml-2 text-white">Car</span>
          </label>
        </div>
        </div>
        <div>
          <span className='font-bold'>
            Status:
          </span>
        <div className="mb-4 mt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              id='isactivemander'
              name='isactivemander'
              className="form-checkbox"
              checked={isactivemander}
              onChange={(event) => setIsactivemander(event.target.checked)}
            />
            <span className="ml-2 text-white">Active</span>
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
            <span className="ml-2 text-white">Validated</span>
          </label>
        </div>
        </div>

        <button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-20 mb-2">
          Update Mander
        </button>
        <button type="reset" className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateManderForm;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosGet, axiosPut } from '../../Logic/Apihelpers';
import apiUrl from '../../config/apiConfig';

function UpdateManderForm() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [mander, setMander] = useState({});
  const [car, setCar] = useState(false);
  const [bike, setBike] = useState(false);
  const [active, setActive] = useState(false);
  const [validate, setValidate] = useState(false);
  const [address, setAddress] = useState('')
  const [cc, setCc] = useState('');
  const [userId, setUserId] = useState('');
  const [existingImage, setExistingImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosGet(`${apiUrl}/api/mander/${id}`).then(response => {
      setMander(response);
      setCar(response.ishavecar_mander);
      setBike(response.ishavemoto_mander);
      setActive(response.isactive_mander);
      setValidate(response.isvalidate_mander);
      setAddress(response.address_mander);
      setCc(response.cc_mander);
      setUserId(response.user_id_user);
      setExistingImage(response.image_user);
    });
  }, [id]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('ishavecar_mander', car);
    formData.append('ishavemoto_mander', bike);
    formData.append('isactive_mander', active);
    formData.append('isvalidate_mander', validate);
    formData.append('address_mander', address);
    formData.append('cc_mander', cc);
    formData.append('user_id_user', userId)
    if (image) {
      formData.append('image_mander', image);
    }
    
    axiosPut(`${apiUrl}/api/mander/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response);
      setShowModal(true); // Mensaje modal
    }).catch(error => {
      console.error(error);
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    // Mostrar la imagen seleccionada por el usuario
    setExistingImage(URL.createObjectURL(e.target.files[0]));
  };

  const closeModal = () => {
    setShowModal(false);
    navigate(window.history.back()); 
  };

  const handleCancel = () => {
    window.history.back(); 
  }

  return (
    <div className="bg-stone-900 min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-black rounded-lg shadow-md mt-20 w-80">
        <h2 className="text-lg font-bold mb-4 text-white">Edit Mander</h2>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="cc">
            Document:
          </label>
          <input
            type="text"
            id="cc"
            value={cc}
            onChange={e => setCc(e.target.value)}
            className={`p-2 shadow-lg rounded-lg w-full mb-4`}
          />
        </div>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="address">
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className={`p-2 shadow-lg rounded-lg w-full mb-4`}
          />
        </div>
        <div className='text-lg font-bold text-white py-2'>Status:
        <div className='text-sm font-bold mt-2'>
          <label>
            <input
              type="checkbox"
              checked={active}
              onChange={() => setActive(!active)}
            />
           <span className=" text-sm ml-2 text-white">Active</span>
          </label>
        </div>
        <div className='text-sm font-bold'>
          <label>
            <input
              type="checkbox"
              checked={validate}
              onChange={() => setValidate(!validate)}
            />
            <span className=" text-sm ml-2 text-white">Validated</span>
          </label>
        </div>
        </div>
        <div className='text-lg font-bold text-white'>Vehicle Registered:
        <div className='text-sm font-bold mt-2'>
          <label>
            <input
              type="checkbox"
              checked={car}
              onChange={() => setCar(!car)}
            />
            <span className=" text-sm ml-2 text-white">Car</span>
          </label>
        </div>
        <div className='text-sm font-bold'>
          <label>
            <input
              type="checkbox"
              checked={bike}
              onChange={() => setBike(!bike)}
            />
            <span className=" text-sm ml-2 text-white">Bike</span>
          </label>
        </div>
        </div>
        <div className="mb-4 text-black mt-2">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="image">
            Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className={`p-2 shadow-lg rounded-lg w-full mb-4`}
          />
        </div>
        {existingImage && <img src={existingImage} alt="Existing User Image" className="w-24 h-24 mb-2 object-cover rounded-full"/>}
        <div className="flex justify-between">
          <button className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleUpdate}>
            Update
          </button>
          <button className="bg-red-950 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4">Update Successful!</p>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateManderForm;

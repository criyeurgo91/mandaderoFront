import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosGet, axiosPatch } from '../../Logic/Apihelpers';
import apiUrl from '../../config/apiConfig';

function UpdateUserForm() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [accountId, setAccountId] = useState('')
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosGet(`${apiUrl}/api/user/${id}`).then(response => {
      setUser(response);
      setName(response.name_user);
      setLastname(response.lastname_user);
      setPhone(response.phone_user);
      setAccountId(response.account_id_account);
      setExistingImage(response.image_user);
    });
  }, [id]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('name_user', name);
    formData.append('lastname_user', lastname);
    formData.append('phone_user', phone);
    formData.append('account_id_account', accountId)
    if (image) {
      formData.append('image_user', image);
    }
    
    axiosPatch(`${apiUrl}/api/user/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response);
      setShowModal(true); 
    }).catch(error => {
      console.error(error);
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setExistingImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
  };
  
  
  

  const closeModal = () => {
    setShowModal(false);
    navigate(-1); 
  };

  const handleCancel = () => {
    window.history.back(); 
  }

  return (
    <div className="bg-sky-50 min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-sky-800 rounded-lg shadow-md mt-20 w-80">
        <h2 className="text-lg font-semibold mb-4 text-white">Usuario</h2>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className={`p-2 shadow-lg rounded-lg w-full mb-4`}
          />
        </div>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="lastname">
            Apellido:
          </label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            className={`p-2 shadow-lg rounded-lg w-full mb-4`}
          />
        </div>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="phone">
            Celular:
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className={`p-2 shadow-lg rounded-lg w-full mb-4`}
          />
        </div>
        <div className="mb-4 text-black">
        <label className="block text-white text-sm font-bold mb-2">Imagen:</label>
              <input
                type="file"
                name="image_vehicle"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-40" />}
        </div>
        {existingImage && <img src={existingImage} alt="Existing User Image" className="w-24 h-24 mb-2 object-cover rounded-full" />}

        <div className="flex justify-between">
          <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleUpdate}>
            Actualizar
          </button>
          <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blues-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4">Actualizacion Exitosa!</p>
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateUserForm;

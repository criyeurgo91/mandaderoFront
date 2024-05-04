import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { axiosGet, axiosPatch } from '../../Logic/Apihelpers';
import apiUrl from '../../config/apiConfig';

function UpdateManderProfileForm() {
  const { id } = useParams();
  const { state } = useLocation();
  const { id_user, id_mander } = state;
  const navigate = useNavigate();
  const [ showModal, setShowModal] = useState(false)

  // Estado compartido entre los dos formularios
  const [data, setData] = useState({
    user: {},
    name: '',
    lastname: '',
    phone: '',
    existingImage: null,
    mander: {},
    car: false,
    bike: false,
    active: false,
    validate: false,
    address: '',
  });

  useEffect(() => {
    // Lógica para cargar los datos del usuario y del mander
    const fetchData = async () => {
      const userData = await axiosGet(`${apiUrl}/api/user/${id_user}`);
      const manderData = await axiosGet(`${apiUrl}/api/mander/${id_mander}`);
      setData({
        ...data,
        user: userData,
        name: userData.name_user,
        lastname: userData.lastname_user,
        phone: userData.phone_user,
        
        mander: manderData,
        car: manderData.ishavecar_mander,
        bike: manderData.ishavemoto_mander,
        validate: manderData.isvalidate_mander,
        address: manderData.address_mander,
        existingImage: manderData.image_user,
      });
    };
    fetchData();
  }, [id]);

  // Función para manejar la actualización del usuario
  const handleUserUpdate = async () => {
    const formData = new FormData();
    formData.append('name_user', data.name);
    formData.append('lastname_user', data.lastname);
    formData.append('phone_user', data.phone);

    try {
      const response = await axiosPatch(`${apiUrl}/api/user/${id_user}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar la actualización del mander
  const handleManderUpdate = async () => {
    const formData = new FormData();
    formData.append('ishavecar_mander', data.car);
    formData.append('ishavemoto_mander', data.bike);
    formData.append('isvalidate_mander', data.validate);
    formData.append('address_mander', data.address);
    if (data.image) {
      formData.append('image_mander', data.image);
    }

    try {
      const response = await axiosPatch(`${apiUrl}/api/mander/${id_mander}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      setShowModal(true)
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    setData({
      ...data,
      image: e.target.files[0],
      existingImage: URL.createObjectURL(e.target.files[0]),
    });
  };

  // Función para cerrar el modal
  const closeModal = () => {
    navigate(-1);
  };

  // Función para cancelar
  const handleCancel = () => {
    window.history.back();
  };

  return(
    <div className="bg-stone-900 min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-black rounded-lg shadow-md mt-20 w-80">
        <h2 className="text-lg font-semibold mb-4 text-white">Actualizar Perfil</h2>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
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
            value={data.lastname}
            onChange={e => setData({ ...data, lastname: e.target.value })}
            className={`p-2 shadow-lg rounded-lg w-full mb-4`}
          />
        </div>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="phone">
            Celuar:
          </label>
          <input
            type="text"
            id="phone"
            value={data.phone}
            onChange={e => setData({ ...data, phone: e.target.value })}
            className={`p-2 shadow-lg rounded-lg w-full mb-4`}
          />
        </div>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="image">
            Imagen:
          </label>
          <input          
            type="file"
            id="image"
            onChange={handleImageChange}
            className={`p-2 shadow-lg rounded-lg w-full mb-4`}
          />
        </div>
        {data.existingImage && <img src={data.existingImage} alt="Existing User Image" className="w-24 h-24 mb-2 object-cover rounded-full"/>}
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="address">
            Direccion:
          </label>
          <input
            type="text"
            id="address"
            value={data.address}
            onChange={e => setData({ ...data, address: e.target.value })}
            className={`p-2 shadow-lg rounded-lg w-full mb-4`}
          />
        </div>
        <div className='text-lg font-bold text-white py-2'>Estado:
          <div className='text-sm font-bold'>
            <label>
              <input
                type="checkbox"
                checked={data.validate}
                onChange={() => setData({ ...data, validate: !data.validate })}
              />
              <span className=" text-sm ml-2 text-white">Validado</span>
            </label>
          </div>
        </div>
        <div className='text-lg font-bold text-white'>Vehiculo Activo:
          <div className='text-sm font-bold mt-2'>
            <label>
              <input
                type="checkbox"
                checked={data.car}
                onChange={() => setData({ ...data, car: !data.car })}
              />
              <span className=" text-sm ml-2 text-white">Carro</span>
            </label>
          </div>
          <div className='text-sm font-bold'>
            <label>
              <input
                type="checkbox"
                checked={data.bike}
                onChange={() => setData({ ...data, bike: !data.bike })}
              />
              <span className=" text-sm ml-2 text-white">Moto</span>
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => {handleUserUpdate(); handleManderUpdate();}}>
            Actualizar
          </button>
          <button className="bg-red-950 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4">¡Actualización exitosa!</p>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>

  )
}

export default UpdateManderProfileForm
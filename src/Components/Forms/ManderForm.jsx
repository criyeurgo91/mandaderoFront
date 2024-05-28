import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosPost } from '../../Logic/Apihelpers';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';

const ManderForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      isMander: true, 
      activeMander: false, 
      validateMander: false, 
      carMander: false,
      bikeMander: false,
    }
  });
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  //parametros cuenta
  const handleRegister = async (formData) => {
    const dataAccountUser = {
      email_account: formData.emailUser,
      password_account: formData.passwordUser,
    };

    // Crear la cuenta de usuario
    axiosPost(`${apiUrl}/api/account/`, dataAccountUser)
      .then((response) => {
        if (response) {
          setShowModal(true)
          const accountId = response.id_account;
          // Crear el usuario
          handleUserRegister(formData, accountId);
        } else {
          alert('Failed to save Account');
        }
      })
      .catch((error) => {
        console.error('Error creating account:', error);
        alert('Failed to create account');
      });
  }
  //parametros usuario
  const handleUserRegister = async (formData, accountId) => {
    const dataUser = {
      name_user: formData.nameUser,
      lastname_user: formData.lastnameUser,
      phone_user: formData.phoneUser,
      ismander_user: formData.isMander || true,
      isactive_user: formData.activeUser || true,
      account_id_account: accountId,
    };

    // Crear el usuario
    axiosPost(`${apiUrl}/api/user/`, dataUser)
      .then((response) => {
        if (response) {
          const userId = response.id_user
          // Crear el mandadero
          handleManderRegister(formData, userId)
        } else {
          alert('Failed to save User');
        }
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        alert('Failed to create user');
      });
  }

  //parametros mandadero
  const handleManderRegister = async (formData, userId) => {
    const dataMander = {
      ishavecar_mander: formData.carMander || false,
      ishavemoto_mander: formData.bikeMander || false,
      isactive_mander: formData.activeMander || false,
      isvalidate_mander: formData.validateMander || false,
      address_mander: formData.addressMander,
      cc_mander: formData.ccMander,
      user_id_user: userId,
      image_mander: imageFile,
    };

    const formDataMander = new FormData();
    for (const key in dataMander) {
      formDataMander.append(key, dataMander[key]);
    }

    // Crear el mandadero
    axiosPost(`${apiUrl}/api/mander/`, formDataMander, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

      .then((response) => {
        if (response) {
          
          navigate(window.history.back());
        } else {
          alert('Failed to save Mander');
        }
      })
      .catch((error) => {
        console.error('Error creating Mander:', error);
        alert('Failed to create Mander');
      });
  }

  const handleCancel = () => {
    window.history.back();
  }

  
  const activeMander = watch("activeMander");
  const validateMander = watch("validateMander");
  const carMander = watch("carMander");
  const bikeMander = watch("motoMander");


  return (
    <div className=" bg-sky-50 min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-sky-800 rounded-lg shadow-md mt-20 w-80">
        <h2 className="text-lg font-bold mb-4 text-white">Mander</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-4 text-black">
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="imageMander">
              Imagen:
            </label>
            <input
              type="file"
              id="imageMander"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2 shadow-lg rounded-lg w-full mb-4"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-24 h-24 mb-2 object-cover rounded-full" />
            )}
          </div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="emailUser">
              Correo:
            </label>
            <input
              {...register('emailUser', {
                required: 'este campo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'correo invalido'
                }
              })}
              type="email"
              placeholder="example@example.com"
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.emailUser ? 'border-red-500' : ''}`}
            />
            {errors.emailUser && <span className="text-red-500">{errors.emailUser.message}</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="passwordUser">
              Contraseña:
            </label>
            <input
              {...register('passwordUser', {
                required: 'este campo es obligatorio',
                minLength: { value: 8, message: 'la contraseña debe tener minimo 8 caracteres' },
                maxLength: { value: 20, message: 'la contraseña debe tener maximo 20 caracteres' }
              })}
              type="password"
              placeholder='contraseña'
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.passwordUser ? 'border-red-500' : ''}`}
            />
            {errors.passwordUser && <span className="text-red-500">{errors.passwordUser.message}</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="nameUser">
              Nombre:
            </label>
            <input
              {...register('nameUser', { required: true })}
              type="text"
              placeholder="nombre"
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.nameUser ? 'border-red-500' : ''}`}
            />
            {errors.nameUser && <span className="text-red-500">este campo es obligatorio</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="lastnameUser">
              Apellido:
            </label>
            <input
              {...register('lastnameUser', { required: true })}
              type="text"
              placeholder='apellido'
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.lastnameUser ? 'border-red-500' : ''}`}
            />
            {errors.lastnameUser && <span className="text-red-500">este campo es obligatorio</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="phoneUser">
              Celular:
            </label>
            <input
              {...register('phoneUser', {
                required: 'este campo es obligatorio',
                pattern: {
                  value: /^\d{10}$/, // valida que el telefono tenga 10 digitos
                  message: 'numero de celular invalido'
                }
              })}
              type="text"
              placeholder='numero de celular'
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.phoneUser ? 'border-red-500' : ''}`}
            />
            {errors.phoneUser && <span className="text-red-500">este campo es obligatorio</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="lastnameUser">
              Documento:
            </label>
            <input
              {...register('ccMander', { required: true })}
              type="text"
              placeholder='numero de documento'
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.cc_mander ? 'border-red-500' : ''}`}
            />
            {errors.cc_Mander && <span className="text-red-500">este campo es obligatorio</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="lastnameUser">
              Direccion:
            </label>
            <input
              {...register('addressMander', { required: true })}
              type="text"
              placeholder='direccion'
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.addressMander ? 'border-red-500' : ''}`}
            />
            {errors.addressMander && <span className="text-red-500">este campo es obligatorio</span>}
          </div>
          <div className=' text-lg font-bold text-white'>Estado:
          <div className="mb-4">
            <label className="flex items-center">
              <input
                {...register('activeMander')}
                type="checkbox"
                className="form-checkbox"
                checked={activeMander}
              />
              <span className=" text-sm ml-2 text-white">Activo</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                {...register('validateMander')}
                type="checkbox"
                className="form-checkbox"
                checked={validateMander}
              />
              <span className=" text-sm ml-2 text-white">Validar</span>
            </label>
          </div>
          </div>
          <div className='text-base font-bold text-white'>Tipo de Vehiculo:
          <div className="mb-4">
            <label className="flex items-center">
              <input
                {...register('carMander')}
                type="checkbox"
                className="form-checkbox"
                checked={carMander}
              />
              <span className=" text-sm ml-2 text-white">Carro</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                {...register('bikeMander')}
                type="checkbox"
                className="form-checkbox"
                checked={bikeMander}
              />
              <span className=" text-sm ml-2 text-white">Moto</span>
            </label>
          </div>
          </div>
          <div className='flex justify-center py-2'>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-20 mb-2"
          >
            Registrar
          </button>
          <button
            type="button"
            className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          </div>
        </form>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4 text-green-900">Registro Exitoso!</p>
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModal(false)}>cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManderForm;

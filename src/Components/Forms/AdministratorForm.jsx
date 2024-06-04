import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosPost } from '../../Logic/Apihelpers';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';

const AdministratorForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues:{
      isadminUser: true,
      ismanderUser: false
    }
  });
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleRegister = async (formData) => {
    const dataAccountUser = {
      email_account: formData.emailUser,
      password_account: formData.passwordUser,
      isadmin_account: formData.isadminUser || false,
    };

    // Crear la cuenta de usuario
    axiosPost(`${apiUrl}/api/account/`, dataAccountUser)
      .then((response) => {
        if (response) {
          setShowModal(true);
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

  const handleUserRegister = async (formData, accountId) => {
    const dataUser = new FormData();
    dataUser.append('name_user', formData.nameUser);
    dataUser.append('lastname_user', formData.lastnameUser);
    dataUser.append('phone_user', formData.phoneUser);
    dataUser.append('account_id_account', accountId);
    dataUser.append('image_user', imageFile);
    dataUser.append('isadmin_user', true);
    dataUser.append('isactive_user', true);

    // Crear el usuario
    axiosPost(`${apiUrl}/api/user/`, dataUser)
      .then((response) => {
        if (response) {
        } else {
          alert('Failed to save User');
        }
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        alert('Failed to create user: ${error.message}');
      });
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const closeModal = () => {
    setShowModal(false);
    navigate(-1); 
  };

  const handleCancel = () => {
   navigate(-1);
  }

  const isadminUser = watch("isadminUser");
  const ismanderUser = watch("ismanderUser");

  return (
    <div className=" bg-sky-50 min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-sky-800 rounded-lg shadow-md mt-20 w-80">
        <h2 className="text-lg font-bold mb-4 text-white">Administrador</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="emailUser">
              Correo:
            </label>
            <input
              {...register('emailUser', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'ingresa un correo valido'
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
                required: 'Este campo es obligatorio',
                minLength: { value: 8, message: 'la contraseña debe tener minimo 8 caracteres' },
                maxLength: { value: 20, message: 'la contraseña no debe exceder los 20 caracteres' }
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
            {errors.nameUser && <span className="text-red-500">Este campo es obligatorio</span>}
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
            {errors.lastnameUser && <span className="text-red-500">Este campo es obligatorio</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="phoneUser">
              Celular:
            </label>
            <input
              {...register('phoneUser', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^\d{10}$/, // valida que el telefono tenga 10 digitos
                  message: 'Numero de celular invalido'
                }
              })}
              type="text"
              placeholder='celular'
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.phoneUser ? 'border-red-500' : ''}`}
            />
            {errors.phoneUser && <span className="text-red-500">Este campo es obligatorio</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="imageUser">
              Imagen:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`p-2 shadow-lg rounded-lg w-full mb-4`}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-24 h-24 mb-2 object-cover rounded-full" />
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-20 mb-2"
          >
            Guardar
          </button>
          <button
            type="button"
            className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </form>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blues-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4">Registro de Administrador Exitoso!</p>
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdministratorForm;
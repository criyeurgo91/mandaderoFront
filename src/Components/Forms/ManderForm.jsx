import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosPost } from '../../Logic/Apihelpers';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';

const ManderForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

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
      ismander_user: formData.isMander || false,
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

  const isMander = watch("isMander");
  const activeMander = watch("activeMander");
  const validateMander = watch("validateMander");
  const carMander = watch("carMander");
  const bikeMander = watch("motoMander");


  return (
    <div className=" bg-stone-900 min-h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-black rounded-lg shadow-md mt-20 w-80">
        <h2 className="text-lg font-bold mb-4 text-white">Mander Form</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-4 text-black">
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="imageMander">
              Image:
            </label>
            <input
              type="file"
              id="imageMander"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2 shadow-lg rounded-lg w-full mb-4"
            />
          </div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="emailUser">
              Email:
            </label>
            <input
              {...register('emailUser', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
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
              Password:
            </label>
            <input
              {...register('passwordUser', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must have at least 8 characters' },
                maxLength: { value: 20, message: 'Password cannot exceed 20 characters' }
              })}
              type="password"
              placeholder='password'
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.passwordUser ? 'border-red-500' : ''}`}
            />
            {errors.passwordUser && <span className="text-red-500">{errors.passwordUser.message}</span>}
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                {...register('isMander')}
                type="checkbox"
                className="form-checkbox"
                checked={isMander}
              />
              <span className="ml-2 text-white font-bold text-sm">Mander</span>
            </label>
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="nameUser">
              Name:
            </label>
            <input
              {...register('nameUser', { required: true })}
              type="text"
              placeholder="name"
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.nameUser ? 'border-red-500' : ''}`}
            />
            {errors.nameUser && <span className="text-red-500">Name Required</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="lastnameUser">
              Lastname:
            </label>
            <input
              {...register('lastnameUser', { required: true })}
              type="text"
              placeholder='lastname'
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.lastnameUser ? 'border-red-500' : ''}`}
            />
            {errors.lastnameUser && <span className="text-red-500">Lastname Required</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="phoneUser">
              Phone:
            </label>
            <input
              {...register('phoneUser', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{10}$/, // valida que el telefono tenga 10 digitos
                  message: 'Invalid phone number. Must contain exactly 10 digits'
                }
              })}
              type="text"
              placeholder='phone number'
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.phoneUser ? 'border-red-500' : ''}`}
            />
            {errors.phoneUser && <span className="text-red-500"> Phone Required</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="lastnameUser">
              Document:
            </label>
            <input
              {...register('ccMander', { required: true })}
              type="text"
              placeholder='document number'
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.ccMander ? 'border-red-500' : ''}`}
            />
            {errors.ccMander && <span className="text-red-500">Document Required</span>}
          </div>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="lastnameUser">
              Address:
            </label>
            <input
              {...register('addressMander', { required: true })}
              type="text"
              placeholder='addreess'
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.addressMander ? 'border-red-500' : ''}`}
            />
            {errors.addressMander && <span className="text-red-500">Address Required</span>}
          </div>
          <div className=' text-lg font-bold'>Status:
          <div className="mb-4">
            <label className="flex items-center">
              <input
                {...register('activeMander')}
                type="checkbox"
                className="form-checkbox"
                checked={activeMander}
              />
              <span className=" text-sm ml-2 text-white">Active</span>
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
              <span className=" text-sm ml-2 text-white">Validate</span>
            </label>
          </div>
          </div>
          <div className='text-base font-bold text-white'>Vehicle Type:
          <div className="mb-4">
            <label className="flex items-center">
              <input
                {...register('carMander')}
                type="checkbox"
                className="form-checkbox"
                checked={carMander}
              />
              <span className=" text-sm ml-2 text-white">Car</span>
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
              <span className=" text-sm ml-2 text-white">Bike</span>
            </label>
          </div>
          </div>
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-20 mb-2"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="text-lg font-semibold mb-4 text-green-900">Mander Registered Successfully!</p>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManderForm;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosPost } from '../../Logic/Apihelpers';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';
import UserForm from './UserForm';

const SinginForm = () => {

  // Configuración del formulario utilizando react-hook-form
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  // Navegación entre páginas
  const navigate = useNavigate();

  // Función para manejar el registro de la cuenta
  const handleBtnRegister = async (formData) => {
    // Estructura de los datos de la cuenta
    const dataAccountUser = {
      email_account: formData.emailUser,
      password_account: formData.passwordUser,
      isadmin_account: formData.isadminUser || false, 
    };

    // Realiza una solicitud POST para registrar la cuenta
    axiosPost(`${apiUrl}/api/account/`, dataAccountUser).then(
      (response) => {
        if (response) {
          alert('Account Registered');
          setAccountId(response.id_account)
          // Redirecciona a la página profile
          navigate('users');
        } else {
          alert('Failed to save Account');
        }
      }
    );
  }

  const handleCancel = () => {
    window.history.back(); 
  }

  // Obtiene el valor del campo "isadminUser"
  const isadminUser = watch("isadminUser");

  return (

    <div className="flex justify-center items-center h-screen">
    <div className="max-w-sm mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-white">Account</h2>
      <form onSubmit={handleSubmit(handleBtnRegister)}>
        <div className="mb-4 text-black">
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
            className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.passwordUser ? 'border-red-500' : ''}`}
          />
          {errors.passwordUser && <span className="text-red-500">{errors.passwordUser.message}</span>}
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              {...register('isadminUser')}
              type="checkbox"
              className="form-checkbox"
              checked={isadminUser}
            />
            <span className="ml-2 text-white">Is Admin?</span>
          </label>
        </div>
        
        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-20 mb-2"
        >
          Submit
        </button>
        <button
          type="reset"
          className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
    </div>
  );
}

export default SinginForm;

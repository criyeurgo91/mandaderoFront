import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { axiosPatch, axiosGet } from '../../Logic/Apihelpers';
import { useNavigate, useParams } from 'react-router-dom';
import apiUrl from '../../config/apiConfig';

const UpdateAccountForm = () => {
    // Obtiene el ID de la cuenta desde la URL
  const { id } = useParams(); 
  // Estado para almacenar los datos de la cuenta
  const [accountData, setAccountData] = useState(null); 
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate(); 

  // Función para obtener los datos de la cuenta
  const fetchAccountData = async () => {
    try {
      const response = await axiosGet(`${apiUrl}/api/account/${id}/`);
      setAccountData(response);
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  // Función para manejar la actualización de la cuenta
  const handleUpdateAccount = async (formData) => {
    try {
      const updatedAccountData = {
        email_account: formData.emailUser,
        password_account: formData.passwordUser,
      };

      
      await axiosPatch(`${apiUrl}/api/account/${id}/`, updatedAccountData);
      alert('Cuenta Actualizada');
      navigate(-1);
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update Account');
    }
  };

  if (!accountData) {
    return <div>Loading...</div>; 
  }

  const handleCancel = () => {
    navigate(-1); 
  }

  return (
    <div className="bg-stone-900 min-h-screen flex justify-center items-center">
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm mx-auto p-6 bg-black rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-white">Actualizar Cuenta</h2>
        <form onSubmit={handleSubmit(handleUpdateAccount)}>
          <div className="mb-4 text-black">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="emailUser">
              Correo:
            </label>
            <input
              {...register('emailUser', { required: 'Email is required' })}
              type="email"
              defaultValue={accountData.email_account}
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
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                maxLength: { value: 20, message: 'Password must not exceed 20 characters' }
              })}
              type="password"
              className={`p-2 shadow-lg rounded-lg w-full mb-4 ${errors.passwordUser ? 'border-red-500' : ''}`}
            />
            {errors.passwordUser && <span className="text-red-500">{errors.passwordUser.message}</span>}
          </div>
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-20 mb-2"
          >
            Actualizar
          </button>
          <button
            type="button"
            className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={ handleCancel}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateAccountForm;

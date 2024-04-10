import { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';


function UserForm({ onCreate, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorPhone, setErrorPhone] = useState('')

  useEffect(() => {
    
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const accountResponse = await axios.post(`${apiUrl}/api/account/`, {
        email_account: email,
        password_account: password,
        isadmin_account: isAdmin,
      });

      const accountId = accountResponse.data.id_account;

      const formData = new FormData();
      formData.append('account_id_account', accountId);
      formData.append('image_user', image);
      formData.append('name_user', name);
      formData.append('lastname_user', lastname);
      formData.append('phone_user', phone);

       const userResponse = await axios.post(`${apiUrl}/api/user/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const userId = userResponse.data.id_user

      setMessage('User created successfully.');

      setEmail('');
      setPassword('');
      setImage(null);
      setPreviewImage(null);
      setName('');
      setLastname('');
      setPhone('');
      setIsAdmin(false);

      onCreate();
      onClose();
      
    } catch (error) {
      setMessage('Error creating user. Please try again.');
      console.error('Error creating user:', error);
    }
  };

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setErrorPassword('La contraseña debe tener entre 8 y 20 caracteres.');
    }else{
      setErrorPassword('')
    } 
    
  };

  const handleChangeEmail = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(newEmail)) {
      setErrorEmail("ingresa un correo electrónico válido");
    }else{
      setErrorEmail('')
    }
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage)); 
  };

  const handleChangePhone = (event) => {
    const newphone = event.target.value;
    setPhone(newphone);

    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(newphone)) {
      setErrorPhone("ingresa un numero de telefono valido");
    }else{
      setErrorPhone('')
    }
  };


  return (
    <div className="max-w-sm mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create User</h2>
      {message && (
        <div className={`bg-${message.includes('successfully') ? 'green' : 'red'}-100 border border-${message.includes('successfully') ? 'green' : 'red'}-400 text-${message.includes('successfully') ? 'green' : 'red'}-700 px-4 py-3 mb-4 rounded`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            value={email}
            onChange={handleChangeEmail}
            required
            
          />
          {errorEmail && <p className="text-red-500">{errorEmail}</p>}
        </div>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            minLength={8}
            maxLength={20}
            className="w-full px-3 py-2 border rounded-md"
            value={password}
            onChange={handleChangePassword}
            required
          />
          {errorPassword && <p className="text-red-500">{errorPassword}</p>}
        </div>
        <div className="mb-4 ">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="image">
            Image:
          </label>
          <input
            id="image"
            type="file"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleImageChange}
            accept="image/*"
          />
          {previewImage && (
            <img src={previewImage} alt="Preview" className="w-24 h-24 mb-4 mt-4 object-cover rounded-full" />
          )}
        </div>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="lastname">
            Lastname:
          </label>
          <input
            id="lastname"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            required
          />
        </div>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="phone">
            Phone:
          </label>
          <input
            id="phone"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={phone}
            onChange={handleChangePhone}
            required
          />
          {errorPhone && <p className="text-red-500">{errorPhone}</p>}
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isAdmin}
              onChange={(event) => setIsAdmin(event.target.checked)}
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
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UserForm;

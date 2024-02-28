import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [isMander, setIsMander] = useState(false);
  const [message, setMessage] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      // Crear la cuenta
      const accountResponse = await axios.post('http://127.0.0.1:8000/api/account/', {
        email_account: email,
        password_account: password,
        
      });

      

      

      // Obtener el ID de la cuenta creada
      const accountId = accountResponse.data.id_account;

      // Crear el usuario con el ID de la cuenta
      const userResponse = await axios.post('http://127.0.0.1:8000/api/user/', {
        account_id_account: accountId,
        image_user: image,
        name_user: name,
        lastname_user: lastname,
        phone_user: phone,
        ismander_user: isMander,
      });

      setMessage('User created successfully.');
      console.log('Response:', userResponse.data);
      
      // Limpiar los campos después de enviar el formulario
      setImage(null);
      setName('');
      setLastname('');
      setPhone('');
      setIsMander(false);
    } catch (error) {
      setMessage('Error creating user. Please try again.');
      console.error('Error creating user:', error);
    }
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
    setIsValidEmail(validateEmail(email));
  };

  const validateEmail = (email) => {
    // Implementa tu lógica de validación de correo electrónico aquí
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create User</h2>
      {message && (
        <div className={`bg-${message.includes('successfully') ? 'green' : 'red'}-100 border border-${message.includes('successfully') ? 'green' : 'red'}-400 text-${message.includes('successfully') ? 'green' : 'red'}-700 px-4 py-3 mb-4 rounded`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className={`w-full px-3 py-2 border rounded-md ${isValidEmail ? '' : 'border-red-500'}`}
            value={email}
            onChange={handleEmailChange}
            required
          />
          {!isValidEmail && <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image:
          </label>
          <input
            id="image"
            type="file"
            className="w-full px-3 py-2 border rounded-md"
            onChange={(event) => setImage(event.target.files[0])}
            accept="image/*"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone:
          </label>
          <input
            id="phone"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isMander}
              onChange={(event) => setIsMander(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is Mander?</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;

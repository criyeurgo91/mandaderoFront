import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm() {
  const [accounts, setAccounts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/account/');
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      // Creamos la cuenta con el indicador de admin
      const accountResponse = await axios.post('http://127.0.0.1:8000/api/account/', {
        email_account: email,
        password_account: password,
        isadmin_account: isAdmin, // Aquí corregimos el nombre del parámetro
      });

      // Obtenemos el ID de la cuenta creada
      const accountId = accountResponse.data.id_account;

      // Creamos el usuario asociado a la cuenta
      await axios.post('http://127.0.0.1:8000/api/user/', {
        account_id_account: accountId,
        image_user: image,
        name_user: name,
        lastname_user: lastname,
        phone_user: phone,
      });

      setMessage('User created successfully.');
      console.log('User created successfully.');

      // Limpiar los campos después de enviar el formulario
      setEmail('');
      setPassword('');
      setImage(null);
      setName('');
      setLastname('');
      setPhone('');
      setIsAdmin(false);
    } catch (error) {
      setMessage('Email already exist. Please try again.');
      console.error('Error creating user:', error);
    }
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
            className="w-full px-3 py-2 border rounded-md"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
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
              checked={isAdmin}
              onChange={(event) => setIsAdmin(event.target.checked)}
            />
            <span className="ml-2 text-gray-700">Is Admin?</span>
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

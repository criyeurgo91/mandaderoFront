import  { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm({ onCreate, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Aquí puedes realizar cualquier acción que necesites cuando se monte el componente
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const accountResponse = await axios.post('http://127.0.0.1:8000/api/account/', {
        email_account: email,
        password_account: password,
        isadmin_account: isAdmin,
      });

      const accountId = accountResponse.data.id_account;

       // Crear un objeto FormData para enviar la imagen
       const formData = new FormData();
       formData.append('account_id_account', accountId);
       formData.append('image_user', image);
       formData.append('name_user', name);
       formData.append('lastname_user', lastname);
       formData.append('phone_user', phone);

       await axios.post('http://127.0.0.1:8000/api/user/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Indicar que se envía una imagen
        },
      });

      setMessage('User created successfully.');

      // Limpiar los campos después de enviar el formulario
      setEmail('');
      setPassword('');
      setImage(null);
      setName('');
      setLastname('');
      setPhone('');
      setIsAdmin(false);

      // Llamar a la función onCreate para actualizar la lista de usuarios
      onCreate();

      // Llamar a la función onClose para cerrar el formulario después de una creación exitosa
      onClose();

    } catch (error) {
      setMessage('Error creating user. Please try again.');
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

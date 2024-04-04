import { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

function SinginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/account/`, {
        email_account: email,
        password_account: password,
        isadmin_account: formData.isadmin_account ? formData.isadmin_account : false,
      });

      if (response.status === 201) {
        setMessage('Account created successfully.');
      } else {
        setMessage('Error creating account. Please try again.');
      }

      console.log('Account created:', response.data);

      // Limpiar los campos después de enviar el formulario
      setEmail('');
      setPassword('');
      setIsAdmin(false);
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setIsValidEmail(/^\S+@\S+\.\S+$/.test(emailValue));
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create Account</h2>
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
            onChange={handleEmailChange}
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
          {!isValidEmail && <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isAdmin">
            <input
              id="isAdmin"
              name='isAdmin'
              type="checkbox"
              className="mr-2"
              checked={isAdmin}
              onChange={(event) => setIsAdmin(event.target.checked)}
            />
            Admin
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

export default SinginForm

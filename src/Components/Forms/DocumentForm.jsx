import  { useState, useEffect } from 'react';
import axios from 'axios';

function DocumentForm() {
  const [imageDocument, setImageDocument] = useState(null);
  const [isDocumentVehicle, setIsDocumentVehicle] = useState(false);
  const [isVerifiedDocument, setIsVerifiedDocument] = useState(false);
  const [typeDocument, setTypeDocument] = useState(null);
  const [dateVerifiedDocument, setDateVerifiedDocument] = useState(null);
  const [userIdUser, setUserIdUser] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://manders.azurewebsites.net/api/user/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image_document', imageDocument);
      formData.append('isdocument_vehicle', isDocumentVehicle);
      formData.append('isverified_document', isVerifiedDocument);
      formData.append('type_document', typeDocument);
      formData.append('dateverified_document', dateVerifiedDocument);
      formData.append('user_id_user', userIdUser);

      await axios.post('https://manders.azurewebsites.net/api/document/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Document added successfully.');

     
      setImageDocument(null);
      setIsDocumentVehicle(false);
      setIsVerifiedDocument(false);
      setTypeDocument('');
      setDateVerifiedDocument('');
      setUserIdUser('');

    } catch (error) {
      setMessage('Error adding document. Please try again.');
      console.error('Error adding document:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Document</h2>
      {message && (
        <div className={`bg-${message.includes('successfully') ? 'green' : 'red'}-100 border border-${message.includes('successfully') ? 'green' : 'red'}-400 text-${message.includes('successfully') ? 'green' : 'red'}-700 px-4 py-3 mb-4 rounded`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_document">
            Document Image:
          </label>
          <input
            id="image_document"
            type="file"
            className="w-full px-3 py-2 border rounded-md"
            onChange={(event) => setImageDocument(event.target.files[0])}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Is Document Vehicle?
          </label>
          <input
            type="checkbox"
            className="form-checkbox"
            checked={isDocumentVehicle}
            onChange={(event) => setIsDocumentVehicle(event.target.checked)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Is Verified Document?
          </label>
          <input
            type="checkbox"
            className="form-checkbox"
            checked={isVerifiedDocument}
            onChange={(event) => setIsVerifiedDocument(event.target.checked)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type_document">
            Document Type:
          </label>
          <select
            id="type_document"
            className="w-full px-3 py-2 border rounded-md"
            value={typeDocument}
            onChange={(event) => setTypeDocument(event.target.value)}
            required
          >
            <option value="">Select Document Type</option>
            <option value="CC">Cedula de Ciudadania</option>
            <option value="SOAT">SOAT</option>
            <option value="LICENCIA">Licencia</option>
            <option value="OPERACION">Operacion</option>
            <option value="TECNOMECANICA">Tecnomecanica</option>
            <option value="RECIBO">Recibo</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateverified_document">
            Date Verified Document:
          </label>
          <input
            id="dateverified_document"
            type="date"
            className="w-full px-3 py-2 border rounded-md"
            value={dateVerifiedDocument}
            onChange={(event) => setDateVerifiedDocument(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">
            User:
          </label>
          <select
            id="user"
            className="w-full px-3 py-2 border rounded-md"
            value={userIdUser}
            onChange={(event) => setUserIdUser(event.target.value)}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id_user} value={user.id_user}>
                {user.name_user} {user.lastname_user}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Document
        </button>
      </form>
    </div>
  );
}

export default DocumentForm;

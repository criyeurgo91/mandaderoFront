import  { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

function DocumentForm({ onCreate, onClose }) {
  const [imageDocument, setImageDocument] = useState(null);
  const [previewImage, setPreviewImage] = useState(null)
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
      const response = await axios.get(`${apiUrl}/api/user/`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImageDocument(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage));
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

      await axios.post(`${apiUrl}/api/document/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Document added successfully.');

     
      setImageDocument(null);
      setPreviewImage(null);
      setIsDocumentVehicle(false);
      setIsVerifiedDocument(false);
      setTypeDocument('');
      setDateVerifiedDocument('');
      setUserIdUser('');

      // Llamar a la función onCreate para actualizar la lista de usuarios
      onCreate();

      // Llamar a la función onClose para cerrar el formulario después de una creación exitosa
      onClose();

    } catch (error) {
      setMessage('Error adding document. Please try again.');
      console.error('Error adding document:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Document</h2>
      {message && (
        <div className={`bg-${message.includes('successfully') ? 'green' : 'red'}-100 border border-${message.includes('successfully') ? 'green' : 'red'}-400 text-${message.includes('successfully') ? 'green' : 'red'}-700 px-4 py-3 mb-4 rounded`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="image_document">
            Document Image:
          </label>
          <input
            id="image_document"
            type="file"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleImageChange}
            required
          />
          {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-40" />}
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Document Vehicle
          </label>
          <input
            type="checkbox"
            className="form-checkbox"
            checked={isDocumentVehicle}
            onChange={(event) => setIsDocumentVehicle(event.target.checked)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Verified Document
          </label>
          <input
            type="checkbox"
            className="form-checkbox"
            checked={isVerifiedDocument}
            onChange={(event) => setIsVerifiedDocument(event.target.checked)}
          />
        </div>
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="type_document">
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
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="dateverified_document">
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
        <div className="mb-4 text-black">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="user">
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
          className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-20 mb-2"
        >
          Add Document
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

export default DocumentForm;

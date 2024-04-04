import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

const ViewDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchDoc, setSearchDoc] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const documentsResponse = await axios.get(`${apiUrl}/api/document/`);
      const usersResponse = await axios.get(`${apiUrl}/api/user/`);
      setDocuments(documentsResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Error fetching documents and users:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchDoc(event.target.value);
  };

  const handleVerifyDocument = () => {
    navigate('/document/createdocument');
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const filteredDocument = documents.filter((document) =>
    document.type_document.toLowerCase().includes(searchDoc.toLowerCase())
  );

  return (
    <div className=" bg-slate-400 text- min-h-screen">
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-5">View Documents</h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by document type"
          className="w-1/2 border-2 border-gray-300 bg-white h-10 px-6 rounded-lg text-sm focus:outline-none"
          onChange={handleSearch}
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleVerifyDocument}
        >
          Verify Document
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-600">
          <tr>
            <th className="border border-gray-200 px-4 py-2">Document Image</th>
            <th className="border border-gray-300 px-4 py-2">Is Document Vehicle</th>
            <th className="border border-gray-300 px-4 py-2">Is Verified Document</th>
            <th className="border border-gray-300 px-4 py-2">Document Type</th>
            <th className="border border-gray-300 px-4 py-2">Date Verified Document</th>
            <th className="border border-gray-300 px-4 py-2">User Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocument.map((document) => (
            <tr key={document.id_document} className="border border-gray-800">
              <td className="border border-gray-800 px-4 py-2">
                <img
                  src={document.image_document}
                  alt="Document"
                  className="h-16 w-16 cursor-pointer object-cover"
                  onClick={() => handleImageClick(document.image_document)}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{document.isdocument_vehicle ? 'Yes' : 'No'}</td>
              <td className="border border-gray-300 px-4 py-2">{document.isverified_document ? 'Yes' : 'No'}</td>
              <td className="border border-gray-300 px-4 py-2">{document.type_document}</td>
              <td className="border border-gray-300 px-4 py-2">{document.dateverified_document}</td>
              <td className="border border-gray-300 px-4 py-2">
                {users.find((user) => user.id_user === document.user_id_user)?.name_user || 'Unknown'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
          <img src={selectedImage} alt="Selected Document" className="max-w-full max-h-full" onClick={handleCloseModal} />
        </div>
      )}
      </div>
    </div>
  );
};

export default ViewDocument;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewDocument = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/document/');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleVerifyDocument = () => {
    navigate('/document/createdocument'); 
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">View Documents</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleVerifyDocument}
      >
        Verify Document
      </button>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Document Image</th>
              <th className="border border-gray-300 px-4 py-2">Is Document Vehicle</th>
              <th className="border border-gray-300 px-4 py-2">Is Verified Document</th>
              <th className="border border-gray-300 px-4 py-2">Document Type</th>
              <th className="border border-gray-300 px-4 py-2">Date Verified Document</th>
              <th className="border border-gray-300 px-4 py-2">User ID</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{document.image_document}</td>
                <td className="border border-gray-300 px-4 py-2">{document.isdocument_vehicle ? 'Yes' : 'No'}</td>
                <td className="border border-gray-300 px-4 py-2">{document.isverified_document ? 'Yes' : 'No'}</td>
                <td className="border border-gray-300 px-4 py-2">{document.type_document}</td>
                <td className="border border-gray-300 px-4 py-2">{document.dateverified_document}</td>
                <td className="border border-gray-300 px-4 py-2">{document.user_id_user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewDocument;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [searchDoc, setSearchDoc] = useState('');

  const navigate = useNavigate(); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://manders.azurewebsites.net/api/document/');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchDoc(event.target.value);
  };
  const filteredDocument = documents.filter((document) =>
    document.type_document.toLowerCase().includes(searchDoc.toLowerCase())
  );


  const handleVerifyDocument = () => {
    navigate('/document/createdocument'); 
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className="text-2xl font-bold mb-4">View Documents</h2>
        <div className="container mx-auto px-4 py-8">
          
         <div className='flex mb-4'>
           <input
              type="text"
              placeholder="Search by type document"
              className="flex-1 border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
              onChange={handleSearch}
            />
           <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={handleVerifyDocument}
            >
              Verify Document
           </button>
         </div>
          <table className="w-full border-collapse border border-gray-300 ">
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
              {filteredDocument.map((document) => (
                <tr key={document.id_document} className="border border-gray-300">
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

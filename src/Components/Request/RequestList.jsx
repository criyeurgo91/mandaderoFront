import { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

function RequestList() {
  const [request, setRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchRequest();
  }, []);

  const fetchRequest = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/request/`);
      setRequest(response.data);
    } catch (error) {
      console.error('Error fetching request:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'proceso':
        return 'text-blue-500';
      case 'pendiente':
        return 'text-yellow-500';
      case 'finalizado':
        return 'text-green-500';
      default:
        return 'text-white'; 
    }
  };

  const getStatusName = (status) => {
    switch (status.toLowerCase()) {
      case 'proceso':
        return 'Process';
      case 'pendiente':
        return 'Pending';
      case 'finalizado':
        return 'Finish';
      default:
        return ''; 
    }
  };

  const filteredRequest = request.filter((request) =>
    request.detail_request.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === '' || request.status_request.toLowerCase() === statusFilter.toLowerCase())
  );

  return (
    <div className="bg-stone-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Request List</h1>
        <div className='flex justify-start'>
          <input
            type="text"
            placeholder="Search..."
            className="w-1/4 border-2 border-gray-500 bg-black h-10 px-5 rounded-lg text-sm focus:outline-none mr-4"
            onChange={handleSearch}
          />
          <select
            className="w-1/6 border-2 border-gray-500 bg-black h-10 px-5 rounded-lg text-sm focus:outline-none"
            onChange={handleStatusFilter}
          >
            <option value="">All</option>
            <option value="proceso">Process</option>
            <option value="pendiente">Pending</option>
            <option value="finalizado">Finish</option>
          </select>
        </div>
      </div>
      <table className="w-full max-w-6xl mx-auto border-collapse border border-black custom-table">
        <thead className="bg-stone-600">
          <tr>
            <th className="border px-4 py-2">Detail</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequest.map((request) => (
            <tr key={request.id_request} className="border border-black">
              <td className="border px-4 py-2">{request.detail_request}</td>
              <td className={`border px-4 py-2 ${getStatusColor(request.status_request)}`}>
                {getStatusName(request.status_request)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestList;

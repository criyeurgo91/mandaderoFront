import { useState,useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../config/apiConfig'


function RequestList (){

    const [request, setRequest] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

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
      }

      const filteredRequest = request.filter(request => 
        request.detail_request.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (

        <div className="bg-white text-black min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Request List</h1>
            <input
                    type="text"
                    placeholder="Search..."
                    className="w-1/2 border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                    onChange={handleSearch}
                  />
            
                    </div>
                    <table className="w-full bg-white shadow-md rounded my-6">
                      <thead className='bg-gray-200'>
                        <tr>
                        
                    
                          <th className="border px-4 py-2">Detail</th>
                          <th className="border px-4 py-2">Status</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequest.map(request => (
                          <tr key={request.id_service} className='border border-gray-300'>
                            <td className="border px-4 py-2">{request.detail_request}</td>
                            <td className="border px-4 py-2">{request.status_request}</td>
                            <td className="border px-4 py-2">
                                
                           </td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
            

  

export default RequestList

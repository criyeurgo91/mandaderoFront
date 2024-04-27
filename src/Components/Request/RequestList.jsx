import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import apiUrl from "../../config/apiConfig";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeManders, setActiveManders] = useState([]);
  const [selectedMander, setSelectedMander] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [requestsResponse, mandersResponse] = await Promise.all([
        axios.get(`${apiUrl}/api/getlistrequest/`),
        axios.get(`${apiUrl}/api/getlistactivemanders/`)
      ]);
      setRequests(requestsResponse.data);
      setActiveManders(mandersResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleStatusFilter = useCallback((event) => {
    setStatusFilter(event.target.value);
  }, []);

  const handleManderSelect = (mander) => {
    setSelectedMander(mander);
  };

  const handleAssignMander = async (requestId, mander_id_mander, detail_request) => {
    if (!mander_id_mander) {
      alert("Please select a mander first.");
      return;
    }

    try {
      const requestData = {
        request_id_request: requestId,
        mander_id_mander: mander_id_mander,
        status_requestmanager: "espera",
        detail_requestmanager: detail_request,
      };

      await axios.post(`${apiUrl}/api/request_manager/`, requestData);
      
      fetchData();
    } catch (error) {
      console.error(`Error assigning mander to request ${requestId}:`, error);
    }
  };

  const getStatusColor = useCallback((status) => {
    switch (status.toLowerCase()) {
      case "proceso":
        return "text-blue-500";
      case "pendiente":
        return "text-yellow-500";
      case "finalizado":
        return "text-green-500";
      default:
        return "text-white";
    }
  }, []);

  const getStatusName = useCallback((status) => {
    switch (status.toLowerCase()) {
      case "proceso":
        return "Process";
      case "pendiente":
        return "Pending";
      case "finalizado":
        return "Finish";
      default:
        return "";
    }
  }, []);

  const filteredRequests = requests.filter(
    (request) =>
      request.detail_request.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" ||
        request.status_request.toLowerCase() === statusFilter.toLowerCase())
  );

  return (
    <div className="bg-stone-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Request List</h1>
        <div className="flex justify-start mb-4">
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
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">Detail Request</th>
            <th className="border border-gray-300 px-4 py-2">Status Request</th>
            <th className="border border-gray-300 px-4 py-2">Mander Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id_request} className="border border-gray-800">
              <td className="border border-gray-800 px-4 py-2">
                {request.name_user}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {request.detail_request}
              </td>
              <td
                className={`border border-gray-800 px-4 py-2 ${getStatusColor(
                  request.status_request
                )}`}
              >
                {getStatusName(request.status_request)}
              </td>
              <td className="border border-gray-800 px-4 py-2">
                {/* Mostramos el nombre del "mandero" si está asignado */}
                {request.name_mander ? (
                  request.name_mander
                ) : (
                  <>
                    <select
                      onChange={(e) => handleManderSelect(e.target.value)}
                      className="border border-gray-300 bg-black text-white h-8 px-2 rounded-md"
                    >
                      <option value="">Select Mander</option>
                      {activeManders.map((mander) => (
                        <option key={mander.id_mander} value={mander.id_mander}>
                          {mander.name_user} {mander.lastname_user}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>
                        handleAssignMander(
                          request.id_request,
                          selectedMander,
                          request.detail_request
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                      Assign
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;

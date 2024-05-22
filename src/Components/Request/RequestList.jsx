import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import RequestFilter from './RequestFilter';
import RequestTable from './RequestTable';
import RequestFinish from './RequestFinish'; // Importar el nuevo componente
import apiUrl from '../../config/apiConfig';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedMander, setSelectedMander] = useState({});

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(updateElapsedTime, 1000);
    return () => clearInterval(intervalId);
  }, [statusFilter]);
  
  const fetchData = async () => {
    try {
      let url = `${apiUrl}/api/getlistrequest/`;
      if (statusFilter) {
        url += `?status=${statusFilter}`;
      }
      const response = await axios.get(url);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const updateElapsedTime = useCallback(() => {
    setRequests(prevRequests =>
      prevRequests.map(request => ({
        ...request,
        elapsedTime: calculateElapsedTime(request.dateregister_request)
      }))
    );
  }, []);

  const handleSearch = useCallback(event => {
    setSearchTerm(event.target.value);
  }, []);

  const handleStatusFilter = useCallback(event => {
    setStatusFilter(event.target.value);
  }, []);

  const handleManderSelect = useCallback((mander, requestId) => {
    setSelectedMander({ manderId: mander, requestId: requestId });
  }, []);

  const handleAssignMander = useCallback(async (requestId, detail_request) => {
    if (!selectedMander.manderId) {
      alert("Por favor, selecciona primero un mandadero.");
      return;
    }

    try {
      const requestData = {
        request_id_request: requestId,
        mander_id_mander: selectedMander.manderId,
        status_requestmanager: "espera",
        detail_requestmanager: detail_request,
      };

      await axios.post(`${apiUrl}/api/request_manager/`, requestData);

      setRequests(prevRequests =>
        prevRequests.filter(request =>
          request.id_request !== requestId ||
          request.status_request.toLowerCase() === "finalizado"
        )
      );

      setSelectedMander({});
    } catch (error) {
      console.error(`Error asignando mandadero a la solicitud ${requestId}:`, error);
    }
  }, [selectedMander]);

  const getStatusColor = useCallback(status => {
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

  const getStatusName = useCallback(status => {
    switch (status.toLowerCase()) {
      case "proceso":
        return "Proceso";
      case "pendiente":
        return "Pendiente";
      case "finalizado":
        return "Finalizado";
      default:
        return "";
    }
  }, []);

  const calculateElapsedTime = useCallback(startTimeString => {
    const startTime = new Date(startTimeString);
    const currentTime = new Date();
    const elapsedTime = Math.abs(currentTime - startTime);
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }, []);

  const filteredRequests = useMemo(() => {
    let filtered = requests;

    if (statusFilter === "finalizado") {
      filtered = filtered.filter(request =>
        request.status_request.toLowerCase() === "finalizado"
      );
    } else {
      filtered = filtered.filter(request =>
        request.status_request.toLowerCase() === "proceso" ||
        request.status_request.toLowerCase() === "pendiente"
      );
    }

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(request =>
        request.name_user.toLowerCase().includes(searchTermLower) ||
        request.lastname_user.toLowerCase().includes(searchTermLower) ||
        request.phone_user.toLowerCase().includes(searchTermLower) ||
        request.detail_request.toLowerCase().includes(searchTermLower)
      );
    }

    if (statusFilter && statusFilter !== "finalizado") {
      filtered = filtered.filter(request =>
        request.status_request.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    filtered.sort((a, ) => (a.name_mander ? 1 : -1));

    return filtered;
  }, [requests, searchTerm, statusFilter]);

  return (
    <div className="bg-sky-50 text-sky-800 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Lista de Solicitudes</h1>
        <RequestFilter
          handleSearch={handleSearch}
          handleStatusFilter={handleStatusFilter}
        />
      </div>
      <div className="container mx-auto px-4">
        {statusFilter === "finalizado" ? (
          <RequestFinish finishedRequests={filteredRequests} />
        ) : (
          <RequestTable
            requests={filteredRequests}
            getStatusColor={getStatusColor}
            getStatusName={getStatusName}
            selectedMander={selectedMander}
            handleAssignMander={handleAssignMander}
            handleManderSelect={handleManderSelect}
          />
        )}
      </div>
    </div>
  );
};

export default RequestList;

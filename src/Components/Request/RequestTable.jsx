import React, { useState, useCallback, useMemo } from 'react';
import { MdPlace } from 'react-icons/md';
import PropTypes from 'prop-types'; // Importar PropTypes

import axios from 'axios';
import apiUrl from '../../config/apiConfig';

const RequestTable = ({
  requests,
  handleOpenInMaps,
  getStatusColor,
  getStatusName,
  selectedMander,
  handleAssignMander,
  handleManderSelect,
}) => {
  const [activeManders, setActiveManders] = useState([]);
  const [isLoadingManders, setIsLoadingManders] = useState(false);

  const fetchActiveManders = useCallback(async () => {
    setIsLoadingManders(true);
    try {
      const response = await axios.get(`${apiUrl}/api/getlistactivemanders/`);
      setActiveManders(response.data);
    } catch (error) {
      console.error('Error fetching active manders:', error);
    } finally {
      setIsLoadingManders(false);
    }
  }, []);

  const handleManderSelectClick = useCallback(() => {
    if (activeManders.length === 0) {
      fetchActiveManders();
    }
  }, [activeManders, fetchActiveManders]);

  const renderMandersOptions = useMemo(() => {
    return activeManders.map((mander) => (
      <option key={mander.id_mander} value={mander.id_mander}>
        {mander.name_user} {mander.lastname_user}
      </option>
    ));
  }, [activeManders]);

  return (
    <table >
      <thead className="bg-sky-800 text-white">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-center">Tiempo Transcurrido</th>
          <th className="border border-gray-300 px-4 py-2 text-center">Usuario</th>
          <th className="border border-gray-300 px-4 py-2 text-center">Detalle</th>
          <th className="border border-gray-300 px-4 py-2 text-center">Origen</th>
          <th className="border border-gray-300 px-4 py-2 text-center">Destino</th>
          <th className="border border-gray-300 px-4 py-2 text-center">Estado</th>
          <th className="border border-gray-300 px-4 py-2 text-center">Mandadero</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id_request} >
            <td className="border border-gray-300 px-4 py-2 text-center">{request.elapsedTime}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{`${request.name_user} ${request.lastname_user} - ${request.phone_user}`}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{request.detail_request}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {request.origin}
              <button
                className="text-blue-500 ml-2 cursor-pointer"
                onClick={() => handleOpenInMaps(request.originLat, request.originLng, request.destinationLat, request.destinationLng)}
              >
                <MdPlace />
              </button>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">{request.destination}</td>
            <td className={`border px-4 py-2 text-center ${getStatusColor(request.status_request)}`}>
              {getStatusName(request.status_request)}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {request.name_mander ? (
                request.name_mander
              ) : (
                <>
                  {selectedMander?.requestId === request.id_request ? (
                    <button
                      onClick={() =>
                        handleAssignMander(
                          request.id_request,
                          request.detail_request
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 text-center"
                    >
                      Asignar
                    </button>
                  ) : (
                    <select
                      onClick={handleManderSelectClick}
                      onChange={(e) => handleManderSelect(e.target.value, request.id_request)}
                      className="border border-gray-300 bg-sky-950 text-white"
                      disabled={isLoadingManders}
                    >
                      <option value="">Seleccionar Mandadero</option>
                      {renderMandersOptions}
                    </select>
                  )}
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Definir PropTypes para las props del componente
RequestTable.propTypes = {
  requests: PropTypes.array.isRequired,
  handleOpenInMaps: PropTypes.func.isRequired,
  getStatusColor: PropTypes.func.isRequired,
  getStatusName: PropTypes.func.isRequired,
  selectedMander: PropTypes.object.isRequired,
  handleAssignMander: PropTypes.func.isRequired,
  handleManderSelect: PropTypes.func.isRequired,
};

export default React.memo(RequestTable); // Exportar el componente con nombre

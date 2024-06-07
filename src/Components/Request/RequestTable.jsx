import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiUrl from '../../config/apiConfig';

const RequestTable = ({
  requests,
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
    const assignedManderIds = requests.map((request) => request.id_mander).filter(Boolean);
    return activeManders
      .filter((mander) => !assignedManderIds.includes(mander.id_mander))
      .map((mander) => (
        <option key={mander.id_mander} value={mander.id_mander}>
          {mander.name_user} {mander.lastname_user}
        </option>
      ));
  }, [activeManders, requests]);

  const notifySuccess = () => {
    toast.success('Servicio asignado exitosamente');
  };

  const handleAssignManderClick = useCallback((requestId, detailRequest) => {
    handleAssignMander(requestId, detailRequest);
    notifySuccess();
  }, [handleAssignMander]);

  return (
    <div className="overflow-x-auto w-full">
      <ToastContainer />
      <table className="min-w-full divide-y divide-gray-200">
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
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request.id_request}>
              <td className="border border-gray-300 px-4 py-2 text-center">{request.elapsedTime}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {`${request.name_user} ${request.lastname_user} - ${request.phone_user}`}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{request.detail_request}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{request.origin}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{request.destination}</td>
              <td
                className={`border px-4 py-2 text-center ${getStatusColor(
                  request.status_request,
                  request.ispriority_request
                )}`}
              >
                {getStatusName(request.status_request)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {request.name_mander ? (
                  request.name_mander + ' ' + request.lastname_mander
                ) : (
                  <>
                    {selectedMander?.requestId === request.id_request ? (
                      <button
                        onClick={() => handleAssignManderClick(request.id_request, request.detail_request)}
                        className="bg-blue-500 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded ml-2 text-center cursor-pointer"
                      >
                        Asignar
                      </button>
                    ) : (
                      <select
                        onClick={handleManderSelectClick}
                        onChange={(e) => handleManderSelect(e.target.value, request.id_request)}
                        className="border border-gray-300 bg-white text-gray-800 cursor-pointer"
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
    </div>
  );
};

RequestTable.propTypes = {
  requests: PropTypes.array.isRequired,
  getStatusColor: PropTypes.func.isRequired,
  getStatusName: PropTypes.func.isRequired,
  selectedMander: PropTypes.object.isRequired,
  handleAssignMander: PropTypes.func.isRequired,
  handleManderSelect: PropTypes.func.isRequired,
};
//4
export default React.memo(RequestTable);

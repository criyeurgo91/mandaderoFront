
import { Link } from 'react-router-dom';

const RequestFilter = ({ handleSearch, handleStatusFilter, statusFilter}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <input
          type="text"
          placeholder="Buscar..."
          onChange={handleSearch}
          className=" bg-blue-950 border-2 border-blue-500 px-4 py-2 rounded-lg mr-4"
        />
        <select
          onChange={handleStatusFilter}
          className="bg-blue-950 border-2 border-blue-500 px-4 py-2 rounded-lg text-white"
        >
          <option value="pendiente">Pendientes</option>
          <option value="proceso">En proceso</option>
          <option value="finalizado">Finalizados</option>
        </select>
      </div>
      <div>
        
      {statusFilter !== "finalizado" && statusFilter !== "proceso" && (
          <Link to="request/ubicacion-manders" className="bg-sky-800 text-white py-2 px-4 rounded-md">Ubicación Mandaderos y Servicios</Link>
        )}
      </div>
    </div>
  );
};
//3
export default RequestFilter;

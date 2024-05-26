
import { Link } from 'react-router-dom';

const RequestFilter = ({ handleSearch, handleStatusFilter }) => {
  return (
    <div className="flex justify-start mb-4">
      <input
        type="text"
        placeholder="Buscar..."
        className="w-1/2 border-2 border-blue-500 bg-sky-950 h-10 px-5 rounded-lg text-sm text-white focus:outline-none mr-4"
        onChange={handleSearch}
      />
      <select
        className="w-1/6 border-2 border-blue-500 bg-sky-950 h-10 px-5 rounded-lg text-sm text-white focus:outline-none"
        onChange={handleStatusFilter}
      >
        <option value="pendiente">Pendiente</option>
        <option value="proceso">Proceso</option>
        <option value="finalizado">Finalizado</option>
      </select>
    </div>
  );
};

export default RequestFilter;

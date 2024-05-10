import PropTypes from 'prop-types'; // Importar PropTypes

const RequestFilter = ({ handleSearch, handleStatusFilter }) => {
  return (
    <div className="flex justify-start mb-4">
      <input
        type="text"
        placeholder="Buscar..."
        className="w-1/4 border-2 border-gray-500 bg-black h-10 px-5 rounded-lg text-sm focus:outline-none mr-4"
        onChange={handleSearch}
      />
      <select
        className="w-1/6 border-2 border-gray-500 bg-black h-10 px-5 rounded-lg text-sm focus:outline-none"
        onChange={handleStatusFilter}
      >
        <option value="">Mostrar todo</option>
        <option value="proceso">Proceso</option>
        <option value="pendiente">Pendiente</option>
        <option value="finalizado">Finalizado</option>
      </select>
    </div>
  );
};

// Definir PropTypes para las props del componente
RequestFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleStatusFilter: PropTypes.func.isRequired,
};

export default RequestFilter;

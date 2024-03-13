import { useState, useEffect } from 'react';
import { FaUser, FaUserSecret, FaTasks, FaHourglassHalf, FaCheckCircle, FaUserPlus } from "react-icons/fa";

function Home() {
  const [estadisticas, setEstadisticas] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/estadisticas/')
      .then(response => response.json())
      .then(data => setEstadisticas(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="bg-#155e75 text-black flex flex-col min-h-screen p-6 md:p-8 lg:p-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">INICIO</h2>
      </div>

      {estadisticas && (
        <div className="grid gap-4 grid-cols-2 grid-rows-3 px-10 h-full text-lg">
          {renderStatCard("Usuarios Registrados en la App", estadisticas.total_users, <FaUser />)}
          {renderStatCard("Mandaderos Registrados", estadisticas.total_manders, <FaUserSecret />)}
          {renderStatCard("Solicitudes Realizadas", estadisticas.total_requests, <FaTasks />)}
          {renderStatCard("Solicitudes Pendientes", estadisticas.pending_requests, <FaHourglassHalf />)}
          {renderStatCard("Solicitudes en Proceso", estadisticas.processing_requests, <FaUserPlus />)}
          {renderStatCard("Solicitudes Finalizadas", estadisticas.finished_requests, <FaCheckCircle />)}
        </div>
      )}
    </div>
  );
}

function renderStatCard(title, value, icon) {
  return (
    <div className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-center font-semibold">{title}</p>
      <p className="text-center text-gray-600">{value}</p>
    </div>
  );
}

export default Home;

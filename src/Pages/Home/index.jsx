import { useState, useEffect } from 'react';
import { FaUser, FaUserSecret, FaTasks, FaHourglassHalf, FaCheckCircle, FaUserPlus } from "react-icons/fa";
import apiUrl from '../../config/apiConfig';

function Home() {
  const [estadisticas, setEstadisticas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/contadores/`);
        const data = await response.json();
        setEstadisticas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    fetchData();
  }, []);

  return (
    <div className="bg-blue-50 text-sky-800 flex flex-col min-h-screen p-6 md:p-8 lg:p-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold py-10">Inicio</h2>
      </div>

      {estadisticas && (
        <div className="grid gap-4 grid-cols-2 grid-rows-3 px-10 h-full text-lg  text-white">
          {renderStatCard("Usuarios Registrados :", estadisticas.total_users, <FaUser />)}
          {renderStatCard("Mandaderos :", estadisticas.total_manders, <FaUserSecret />)}
          {renderStatCard("Solicitudes Realizadas : ", estadisticas.total_requests, <FaTasks />)}
          {renderStatCard("Solicitudes pendientes : ", estadisticas.pending_requests, <FaHourglassHalf />)}
          {renderStatCard("Solicitudes en Progreso :", estadisticas.processing_requests, <FaUserPlus />)}
          {renderStatCard("Solicitudes Finalizadas :", estadisticas.finished_requests, <FaCheckCircle />)}
        </div>
      )}
    </div>
  );
}

function renderStatCard(title, value, icon) {
  return (
    <div className="flex flex-col justify-center items-center p-6 bg-sky-800 rounded-lg shadow-md ">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-center font-semibold">{title}</p>
      <p className="text-center text-white">{value}</p>
    </div>
  );
}

export default Home;

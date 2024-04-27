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
    <div className="bg-stone-900 text-white flex flex-col min-h-screen p-6 md:p-8 lg:p-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Home</h2>
      </div>

      {estadisticas && (
        <div className="grid gap-4 grid-cols-2 grid-rows-3 px-10 h-full text-lg">
          {renderStatCard("Registered Users", estadisticas.total_users, <FaUser />)}
          {renderStatCard("Registered Manders", estadisticas.total_manders, <FaUserSecret />)}
          {renderStatCard("Requests Made", estadisticas.total_requests, <FaTasks />)}
          {renderStatCard("Pending Requests", estadisticas.pending_requests, <FaHourglassHalf />)}
          {renderStatCard("Requests in Progress", estadisticas.processing_requests, <FaUserPlus />)}
          {renderStatCard("Completed Requests", estadisticas.finished_requests, <FaCheckCircle />)}
        </div>
      )}
    </div>
  );
}

function renderStatCard(title, value, icon) {
  return (
    <div className="flex flex-col justify-center items-center p-6 bg-black rounded-lg shadow-md ">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-center font-semibold">{title}</p>
      <p className="text-center text-white">{value}</p>
    </div>
  );
}

export default Home;

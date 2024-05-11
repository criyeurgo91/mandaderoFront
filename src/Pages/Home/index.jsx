// import { useState, useEffect } from 'react';
// import { FaUser, FaUserSecret, FaTasks, FaHourglassHalf, FaCheckCircle, FaUserPlus } from "react-icons/fa";
// import apiUrl from '../../config/apiConfig';

// function Home() {
//   const [estadisticas, setEstadisticas] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/api/contadores/`);
//         const data = await response.json();
//         setEstadisticas(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }

//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="bg-stone-900 text-white flex flex-col min-h-screen p-6 md:p-8 lg:p-10">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold py-10">Inicio</h2>
//       </div>

//       {estadisticas && (
//         <div className="grid gap-4 grid-cols-2 grid-rows-3 px-10 h-full text-lg">
//           {renderStatCard("Usuarios Registrados :", estadisticas.total_users, <FaUser />)}
//           {renderStatCard("Mandaderos :", estadisticas.total_manders, <FaUserSecret />)}
//           {renderStatCard("Solicitudes Realizadas : ", estadisticas.total_requests, <FaTasks />)}
//           {renderStatCard("Solicitudes pendientes : ", estadisticas.pending_requests, <FaHourglassHalf />)}
//           {renderStatCard("Solicitudes en Progreso :", estadisticas.processing_requests, <FaUserPlus />)}
//           {renderStatCard("Solicitudes Finalizadas :", estadisticas.finished_requests, <FaCheckCircle />)}
//         </div>
//       )}
//     </div>
//   );
// }

// function renderStatCard(title, value, icon) {
//   return (
//     <div className="flex flex-col justify-center items-center p-6 bg-black rounded-lg shadow-md ">
//       <div className="text-3xl mb-2">{icon}</div>
//       <p className="text-center font-semibold">{title}</p>
//       <p className="text-center text-white">{value}</p>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartCard = ({ data }) => {
  return (
    <div className="bg-stone-900 text-blue-400 shadow-md rounded-md p-4 w-screen h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-5 py-5 text-white">Estadísticas</h2>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Usuarios" fill="#8884d8" barSize={40} />
            <Bar dataKey="Mandaderos" fill="#82ca9d" barSize={40} />
            <Bar dataKey="Solicitudes" fill="#ffc658" barSize={40} />
            <Bar dataKey="Pendientes" fill="#ff7f0e" barSize={40} />
            <Bar dataKey="Proceso" fill="#ff4d4f" barSize={40} />
            <Bar dataKey="Finalizado" fill="#52c41a" barSize={40} />
            <Bar dataKey="Activos" fill="#b37feb" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Home = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('https://mandaderos3.azurewebsites.net/api/contadores/')
      .then(response => response.json())
      .then(data => {
        const newData = [
          { name: 'Usuarios totales', Usuarios: data.total_users, color: '#8884d8' },
          { name: 'Mandaderos totales', Mandaderos: data.total_manders, color: '#82ca9d' },
          { name: 'Solicitudes totales', Solicitudes: data.total_requests, color: '#ffc658' },
          { name: 'Solicitudes pendientes', Pendientes: data.pending_requests, color: '#ff7f0e' },
          { name: 'Solicitudes en proceso', Proceso: data.processing_requests, color: '#ff4d4f' },
          { name: 'Solicitudes terminadas', Finalizado: data.finished_requests, color: '#52c41a' },
          { name: 'Mandaderos activos', Activos: data.active_manders, color: '#b37feb' }
        ];
        setChartData(newData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <ChartCard data={chartData} />
    </div>
  );
};

export default Home;




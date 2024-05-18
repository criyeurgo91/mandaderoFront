
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartCard = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-5 py-8 text-sky-800">Solicitudes</h2>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="4 1 2" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Solicitudes" fill="#ffc658" barSize={30} />
            <Bar dataKey="Pendientes" fill="#ff7f0e" barSize={30} />
            <Bar dataKey="Proceso" fill="#ff4d4f" barSize={30} />
            <Bar dataKey="Finalizado" fill="#52c41a" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const TotalRequest = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('https://mandaderos3.azurewebsites.net/api/contadores/')
      .then(response => response.json())
      .then(data => {
        const newData = [
          { name: 'Solicitudes', Solicitudes: data.total_requests, color: '#ffc658' },
          { name: 'Pendientes', Pendientes: data.pending_requests, color: '#ff7f0e' },
          { name: 'Proceso', Proceso: data.processing_requests, color: '#ff4d4f' },
          { name: 'Terminadas', Finalizado: data.finished_requests, color: '#52c41a' },
        ];
        setChartData(newData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="h-full">
      <ChartCard data={chartData} />
    </div>
  );
};

export default TotalRequest;


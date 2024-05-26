
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }} />
            <Legend />
            <Bar dataKey="Solicitudes" fill="#6b48ff" barSize={50} />
            <Bar dataKey="Prioritario" fill="#ff4d4f" barSize={30} />
            <Bar dataKey="Pendientes" fill="#ff7f0e" barSize={30} />
            <Bar dataKey="Proceso" fill="#52c41a" barSize={30} />
            <Bar dataKey="Finalizado" fill="#ff4d4f" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const TotalRequest = ({data}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.requests) {
      const newData = [
        { name: 'Solicitudes', Solicitudes: data.requests.total, color: '#6b48ff' },
        { name: 'Prioritario', Prioritario: data.requests.priority, color: '#ff4d4f' },
        { name: 'Pendientes', Pendientes: data.requests.by_status.find(item => item.status_request === 'Pendiente')?.count || 0, color: '#ff7f0e' },
        { name: 'Proceso', Proceso: data.requests.by_status.find(item => item.status_request === 'Proceso')?.count || 0, color: '#52c41a' },
        { name: 'Terminadas', Finalizado: data.requests.by_status.find(item => item.status_request === 'Finalizado')?.count || 0, color: '#ff4d4f' },
      ];
      setChartData(newData);
    }
  }, [data]);

  return (
    <div className="h-full">
      <ChartCard data={chartData} />
    </div>
  );
};

export default TotalRequest;


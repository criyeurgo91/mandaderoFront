import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, YAxis, XAxis, LabelList } from 'recharts';

const RequestDay = ({ data }) => {
  const valueByDay = data.requests?.value_by_day || [];

  // Obtener la fecha actual y la del día anterior
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Formatear las fechas a yyyy-MM-dd
  const formatDate = (date) => date.toISOString().split('T')[0];
  const todayStr = formatDate(today);
  const yesterdayStr = formatDate(yesterday);

  // Filtrar los datos para incluir solo las fechas de hoy y ayer
  const filteredData = valueByDay.filter(request => {
    const requestDate = request.day.split('T')[0];
    return requestDate === todayStr || requestDate === yesterdayStr;
  });

  const processedData = filteredData.map(request => ({
    date: request.day.split('T')[0], // Obtener solo la fecha (yyyy-MM-dd)
    recibidas: request.count,
  }));

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-5 py-8 text-sky-800">Solicitudes Diarias</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Bar dataKey="recibidas" fill="#6b48ff" barSize={30}>
            <LabelList dataKey="recibidas" position="top" />
          </Bar>
          <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }} formatter={(value) => `${value} solicitudes`} />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RequestDay;

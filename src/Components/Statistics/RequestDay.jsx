
import React, { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, LabelList } from 'recharts';
import apiUrl from '../../config/apiConfig';


const RequestDay = ({data}) => {
  // Verificar si data.requests está definido antes de acceder a value_by_day
  const valueByDay = data.requests?.value_by_day || [];

  const servicesPerDay = {};

  // Procesar los datos recibidos de props
  valueByDay.forEach(request => {
    const formattedDate = request.day.split('T')[0]; // Obtener solo la fecha (yyyy-MM-dd)
    console.log(formattedDate)

    if (servicesPerDay[formattedDate]) {
      servicesPerDay[formattedDate]++;
    } else {
      servicesPerDay[formattedDate] = 1;
    }
  });

  // Convertir los datos procesados en un formato compatible con Recharts
  const processedData = Object.keys(servicesPerDay).map(date => ({
    date: date,
    recibidas: servicesPerDay[date],
  }));

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-5 py-8 text-sky-800">Solicitudes Diarias</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={processedData}
          margin={{ top:20, right: 0, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <Bar dataKey="recibidas" fill="#6b48ff" barSize={30}>
            <LabelList dataKey="date" position="top"/>
          </Bar>
          <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }} formatter={(value) => `${value} solicitudes`} />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RequestDay;





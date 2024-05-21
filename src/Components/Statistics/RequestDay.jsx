
import React, { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import apiUrl from '../../config/apiConfig';

const RequestDay = () => {
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/request/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRequestData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const countServicesPerDay = () => {
    const servicesPerDay = {};

    requestData.forEach(request => {
      const date = new Date(request.dateregister_request).toISOString().slice(0, 10);
      if (servicesPerDay[date]) {
        servicesPerDay[date]++;
      } else {
        servicesPerDay[date] = 1;
      }
    });

    return servicesPerDay;
  };

  const servicesPerDay = countServicesPerDay();

  const processedData = Object.keys(servicesPerDay).map(date => ({
    fecha: date,
    servicios: servicesPerDay[date],
  }));

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-5 py-8 text-sky-800">Solicitudes Diarias</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={processedData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 35,
          }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="servicios" fill="#6b48ff" name="Servicios diarios" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RequestDay;


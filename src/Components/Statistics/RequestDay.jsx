
import React, { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, LabelList } from 'recharts';
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
    date: date,
    recibidas: servicesPerDay[date],
  }));

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-5 py-8 text-sky-800">Solicitudes Diarias</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={processedData}
          margin={{ top: 0, right: 0, left: 0, bottom: 35 }}
        >
          <CartesianGrid strokeDasharray="4 1 2" />
    
          <Bar dataKey="recibidas" fill="#6b48ff" barSize={30} >
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






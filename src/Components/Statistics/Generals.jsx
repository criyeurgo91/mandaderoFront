
import React, { useEffect, useState } from 'react';
import { Card, Flex, Metric, Text } from '@tremor/react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import apiUrl from '../../config/apiConfig';

const Generals = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/contadores/`);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center text-2xl font-bold mb-5 py-8 text-sky-800">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  const cards = [
    {
      title: 'Total Usuarios',
      value: data.total_users,
      percentage: (data.total_users / 100) * 100
    },
    {
      title: 'Mandaderos Activos',
      value: data.active_manders,
      percentage: (data.active_manders / 10) * 100
    },
    {
      title: 'Total Mandaderos',
      value: data.total_manders,
      percentage: (data.total_manders / 10) * 100
    },
  ];

  return (
    <div className="flex flex-nowrap justify-around w-full overflow-x-auto bg-gray-100 p-4 z-10">
      {cards.map((card, index) => (
        <Card key={index} className="p-6 bg-white rounded-lg shadow-md min-w-[300px] transform hover:scale-105 m-2">
          <Text className="text-lg font-semibold text-gray-700">{card.title}</Text>
          <Metric className="text-4xl font-bold text-blue-600">{card.value}</Metric>
          <Flex className="mt-4 items-center justify-between">
            <div className="flex items-center">
              <ArrowUpIcon className="h-5 w-5 text-green-500 mr-2" />
              <Text className="text-sm font-medium text-gray-600">{card.percentage.toFixed(2)}% de progreso</Text>
            </div>
          </Flex>
          <div className="mt-4 h-2 w-full bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${card.percentage}%` }}
            ></div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Generals;


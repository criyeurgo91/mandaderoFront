
import React, { useEffect, useState } from 'react';
import { Card, Flex, Metric, Text } from '@tremor/react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';//importacion de @heroicons/react/ segun version

const TotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mandaderos3.azurewebsites.net/api/contadores');
        const data = await response.json();
        setTotalUsers(data.total_users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const percentage = (totalUsers / 100) * 100; 

  return (
    <Card className="p-6 bg-white rounded-lg shadow-md max-w-sm transform hover:scale-105">
      <Text className="text-lg font-semibold text-gray-700">Total Usuarios</Text>
      <Metric className="text-4xl font-bold text-blue-600">{totalUsers}</Metric>
      <Flex className="mt-4 items-center justify-between">
        <div className="flex items-center">
          <ArrowUpIcon className="h-5 w-5 text-green-500 mr-2" />
          <Text className="text-sm font-medium text-gray-600">{percentage.toFixed(2)}% de progreso</Text>
        </div>
      </Flex>
      <div className="mt-4 h-2 w-full bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </Card>
  );
};

export default TotalUsers;





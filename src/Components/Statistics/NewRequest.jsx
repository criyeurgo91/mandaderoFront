
import React, { useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Card, Flex, Text, Metric } from '@tremor/react';

const NewRequest = () => {
  const [pendingRequests, setPendingRequests] = useState(0);
  const [processingRequests, setProcessingRequests] = useState(0);
  const [previousPendingRequests, setPreviousPendingRequests] = useState(0);
  const [previousProcessingRequests, setPreviousProcessingRequests] = useState(0);
  const [iconColor, setIconColor] = useState('text-blue-500'); // Estado para controlar el color del icono

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mandaderos3.azurewebsites.net/api/contadores/');
        const data = await response.json();
        setPendingRequests(data.pending_requests);
        setProcessingRequests(data.processing_requests);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (pendingRequests > previousPendingRequests) {
      setIconColor('text-green-500');
    } else if (processingRequests > previousProcessingRequests && pendingRequests < previousPendingRequests) {
      setIconColor('text-blue-500');
    }

    setPreviousPendingRequests(pendingRequests);
    setPreviousProcessingRequests(processingRequests);
  }, [pendingRequests, processingRequests]);

  return (
    <div>
      {/* <Card className="p-4 bg-gray-700 rounded-lg shadow-md"> */}
        <Flex className="items-center justify-between ">
          <FaEnvelope className={`text-4xl ${iconColor}`} />
          <div className="relative">
            <Metric className="text-2xl font-bold text-white">{pendingRequests}</Metric>
          </div>
        </Flex>
        <Text className=" font-semibold text-white mt-4">Solicitudes pendientes</Text>
      {/* </Card> */}
    </div>
  );
};

export default NewRequest;

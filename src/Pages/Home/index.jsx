
import React, { useEffect, useState } from 'react';
import apiUrl from '../../config/apiConfig';
import Generals from '../../Components/Statistics/Generals';
import RequestDay from '../../Components/Statistics/RequestDay';
import TotalRequest from '../../Components/Statistics/TotalRequest';

function Index() {


  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/contadores/`);
        const data = await response.json();
        //console.log(data);
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

  return (
    <div className="h-screen bg-gray-100 flex flex-col py-9">
      <div className="w-full">
        <Generals data={data} loading={loading} error={error} />
      </div>

      <div className="flex h-[70%]">
        <div className="w-1/2 bg-white text-sky-800 shadow-md rounded-md p-4 m-2">
          <TotalRequest data={data} />
        </div>
        <div className="w-1/2 bg-white text-sky-800 shadow-md rounded-md p-4 m-2">
          <RequestDay data={data} />
        </div>
      </div>
    </div>
  );
}

export default Index;

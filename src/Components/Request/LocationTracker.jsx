import { useState, useEffect } from 'react';
import axios from 'axios';
import { database, ref, onValue } from '../../firebase/firebase.jsx';
import Map from './Map';
import apiUrl from '../../config/apiConfig';
import { useNavigate } from 'react-router-dom';

const LocationTracker = () => {
  const [manderLocations, setManderLocations] = useState([]);
  const [serviceLocations, setServiceLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de mandaderos y servicios
        const mandersResponse = await axios.get(`${apiUrl}/api/getlistmanders/`);
        const mandersData = mandersResponse.data;

        const servicesResponse = await axios.get(`${apiUrl}/api/getlistrequest/`);
        const serviceLocationsData = servicesResponse.data
          .filter(service => service.status_request !== 'Finalizado')
          .map(service => ({
            ...service,
            name_mander: service.name_mander || 'Sin asignar',
          }));

        // Obtener ubicaciones de mandaderos desde Firebase
        const locationRef = ref(database, 'Manders/location_manders');
        onValue(locationRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const parsedLocations = Object.keys(data).map(key => ({
              id: key,
              lat: data[key].l[0],
              lon: data[key].l[1]
            }));

            const enrichedManderLocations = parsedLocations.map(location => {
              const mander = mandersData.find(m => m.id_mander.toString() === location.id);
              return mander ? {
                ...location,
                name: mander.name_user,
                lastname: mander.lastname_user,
                phone: mander.phone_user,
                type_vehicle: mander.vehicles[0]?.type_vehicle || 'N/A',
                plate: mander.vehicles[0]?.plate_vehicle || 'N/A',
                image: mander.image_mander
              } : location;
            });

            setManderLocations(enrichedManderLocations);
          } else {
            setManderLocations([]);
          }
        }, (error) => {
          console.error('Error obteniendo ubicaciones desde Firebase:', error);
          setError('Error obteniendo ubicaciones desde Firebase');
        });

        setServiceLocations(serviceLocationsData);
        setLoading(false);
      } catch (error) {
        console.error('Error obteniendo datos:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative h-screen">
      <Map manderLocations={manderLocations} serviceLocations={serviceLocations} />
      <div className="absolute top-0 right-0 p-4 flex justify-between items-center">
        
        <button 
          className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(-1)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
//5
export default LocationTracker;

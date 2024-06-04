
import { useState, useEffect } from 'react';
import axios from 'axios';
import { database, ref, onValue } from '../../firebase/firebase.jsx';
import Map from './Map';
import apiUrl from '../../config/apiConfig';

const LocationTracker = () => {
  const [manderLocations, setManderLocations] = useState([]);
  const [serviceLocations, setServiceLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMandersData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getlistmanders/`);
        return response.data;
      } catch (error) {
        console.error('Error obteniendo datos de mandaderos desde la API:', error);
        throw new Error('Error obteniendo datos de mandaderos desde la API');
      }
    };

    const fetchManderLocations = async () => {
      return new Promise((resolve, reject) => {
        const locationRef = ref(database, 'Manders/location_manders');
        onValue(locationRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const parsedLocations = Object.keys(data).map(key => ({
              id: key,
              lat: data[key].l[0],
              lon: data[key].l[1]
            }));
            resolve(parsedLocations);
          } else {
            resolve([]);
          }
        }, (error) => {
          console.error('Error obteniendo ubicaciones desde Firebase:', error);
          reject('Error obteniendo ubicaciones desde Firebase');
        });
      });
    };

    const fetchServiceLocations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getlistrequest/`);
        return response.data;
      } catch (error) {
        console.error('Error obteniendo datos de servicios desde la API:', error);
        throw new Error('Error obteniendo datos de servicios desde la API');
      }
    };

    const fetchData = async () => {
      try {
        const [mandersData, manderLocationsData, serviceLocationsData] = await Promise.all([
          fetchMandersData(),
          fetchManderLocations(),
          fetchServiceLocations()
        ]);

        const enrichedManderLocations = manderLocationsData.map(location => {
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
        setServiceLocations(serviceLocationsData);
        setLoading(false);
      } catch (error) {
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
    <div>
      <h1 className="text-2xl text-sky-800 font-bold mb-4">Ubicación de Mandaderos y Servicios</h1>
      <Map manderLocations={manderLocations} serviceLocations={serviceLocations} />
    </div>
  );
};
//3
export default LocationTracker;
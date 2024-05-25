import { useState, useEffect } from 'react';
import axios from 'axios';
import { database, ref, onValue } from '../../firebase/firebase';
import Map from './Map';
import apiUrl from '../../config/apiConfig';


const LocationTracker = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const locationRef = ref(database, 'Manders/location_manders');
      onValue(locationRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const parsedLocations = Object.keys(data).map(key => ({
            id: key,
            lat: data[key].l[0],
            lon: data[key].l[1]
          }));

          const response = await axios.get(`${apiUrl}/api/getlistmanders/`); 
          const mandersData = response.data;

          const enrichedLocations = parsedLocations.map(cargando => {
            const mander = mandersData.find(m => m.id_mander.toString() === cargando.id);
            return mander ? {
              ...cargando,
              name: mander.name_user,
              lastname: mander.lastname_user,
              phone: mander.phone_user,
              type_vehicle: mander.vehicles[0]?.type_vehicle || 'N/A',
              plate: mander.vehicles[0]?.plate_vehicle || 'N/A',
              image: mander.image_mander
            } : cargando;
          });

          setLocations(enrichedLocations);
        }
      });
    };

    fetchLocations();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-sky-800 font-bold mb-4">Ubicacion Manderos</h1>
      <Map locations={locations} />
    </div>
  );
};
//2
export default LocationTracker;

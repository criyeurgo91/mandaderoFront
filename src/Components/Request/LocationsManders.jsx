import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseInitialized } from '../../firebase/firebase';
import axios from 'axios';

const LocationsManders = () => {
  const [mandersLocations, setMandersLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener lista de Manders activos desde el backend
        const response = await axios.get('/api/getlistactivemanders/');
        const activeManders = response.data;

        // Inicializar Firebase y obtener ubicaciones en tiempo real de Manders activos
        firebaseInitialized.then(app => {
          const db = getDatabase(app);
          const mandersRef = ref(db, 'location_manders');

          onValue(mandersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              // Filtrar las ubicaciones de los Manders activos
              const locations = Object.entries(data)
                .filter(([key]) => key === '25') // Filtramos solo el Mander con ID 25
                .map(([key, value]) => ({
                  id: key,
                  name: "Jhon", // Nombre fijo del Mander
                  lastName: "Quimbaya", // Apellido fijo del Mander
                  latitude: value[2.4571857], // La primera coordenada
                  longitude: value[-76.6305083] // La segunda coordenada
                }));
              setMandersLocations(locations);
            }
          });
        }).catch(error => {
          console.error("Error initializing Firebase:", error);
        });
      } catch (error) {
        console.error("Error fetching Manders locations from Firebase:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenInMaps = (latitude, longitude) => {
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div>
      <h1>Ubicaciones de Manders Activos</h1>
      <ul>
        {mandersLocations.map((location, index) => (
          <li key={index}>
            <strong>{location.name} {location.lastName}:</strong> 
            Latitud: {location.latitude}, Longitud: {location.longitude}
            <button onClick={() => handleOpenInMaps(location.latitude, location.longitude)}>Ver en Mapa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationsManders;

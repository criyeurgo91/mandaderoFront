import PropTypes from 'prop-types';
import { GoogleMap } from '@react-google-maps/api';
import CustomMarker from './CustomMarker';
import ServiceMarker from './ServiceMarker';
import { DarkMapStyle } from './DarkMapStyle';

const Map = ({ manderLocations, serviceLocations }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '100vh', // 100% de la altura de la ventana
  };

  const popayanCenter = {
    lat: 2.4400,
    lng: -76.6100
  };

  const center = manderLocations.length > 0 ? {
    lat: manderLocations[0].lat,
    lng: manderLocations[0].lon
  } : popayanCenter;

  const manderIconUrl = 'https://th.bing.com/th/id/R.cfe8d36adf43ce116228ab73a2f421aa?rik=TId%2fSI%2fdPtMnvw&riu=http%3a%2f%2fprimeiroalerta.com.br%2fimg%2fservicos%2fservico_ronda_motorizada.png&ehk=tJ5M2DB7hAFG9TpOTLOm5SEVpfdGSo%2bjFDx1GN03JBA%3d&risl=&pid=ImgRaw&r=0';
  const serviceIconUrl = 'https://cdn-icons-png.flaticon.com/512/6325/6325479.png';
  const priorityServiceIconUrl = 'https://cdn-icons-png.flaticon.com/512/7972/7972973.png'; 

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={12}
      options={{ styles: DarkMapStyle }}
    >
      {manderLocations.map(location => (
        <CustomMarker
          key={location.id}
          position={{ lat: location.lat, lng: location.lon }}
          iconUrl={manderIconUrl}
          mander={{
            name: location.name,
            lastname: location.lastname,
            phone: location.phone,
            type_vehicle: location.type_vehicle,
            plate: location.plate,
            image: location.image
          }}
        />
      ))}
      {serviceLocations.map(service => (
        <ServiceMarker
          key={service.id_request}
          position={{ lat: parseFloat(service.originLat), lng: parseFloat(service.originLng) }}
          iconUrl={service.ispriority_request ? priorityServiceIconUrl : serviceIconUrl}
          service={{
            origin: service.origin,
            destination: service.destination,
            type_vehicle: service.typevehicle_request,
            priority: service.ispriority_request,
            user: `${service.name_user} ${service.lastname_user}`,
            mander: service.name_mander ? `${service.name_mander} ${service.lastname_mander}` : 'Sin asignar'
          }}
        />
      ))}
    </GoogleMap>
  );
};

Map.propTypes = {
  manderLocations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    name: PropTypes.string,
    lastname: PropTypes.string,
    phone: PropTypes.string,
    type_vehicle: PropTypes.string,
    plate: PropTypes.string,
    image: PropTypes.string
  })).isRequired,
  serviceLocations: PropTypes.arrayOf(PropTypes.shape({
    id_request: PropTypes.number.isRequired,
    originLat: PropTypes.string.isRequired,
    originLng: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    typevehicle_request: PropTypes.string.isRequired,
    ispriority_request: PropTypes.bool.isRequired,
    name_user: PropTypes.string.isRequired,
    lastname_user: PropTypes.string.isRequired,
    name_mander: PropTypes.string,
    lastname_mander: PropTypes.string
  })).isRequired
};
//5
export default Map;

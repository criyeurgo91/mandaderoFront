import PropTypes from 'prop-types';
import { GoogleMap } from '@react-google-maps/api';
import CustomMarker from './CustomMarker';
import ServiceMarker from './ServiceMarker'; // Importar un nuevo componente para manejar los marcadores de las solicitudes

const Map = ({ manderLocations, serviceLocations }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };

  const popayanCenter = {
    lat: 2.4400,
    lng: -76.6100
  };

  const center = manderLocations.length > 0 ? {
    lat: manderLocations[0].lat,
    lng: manderLocations[0].lon
  } : popayanCenter;

  const manderIconUrl = 'https://cdn.icon-icons.com/icons2/2796/PNG/512/bike_motorbike_vehicle_icon_178048.png';
  const serviceIconUrl = 'https://cdn.icon-icons.com/icons2/882/PNG/512/1-65_icon-icons.com_68858.png'; // Ícono para las solicitudes

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
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
          iconUrl={serviceIconUrl}
          service={{
            origin: service.origin,
            destination: service.destination,
            type_vehicle: service.typevehicle_request,
            priority: service.ispriority_request,
            user: `${service.name_user} ${service.lastname_user}`,
            mander: `${service.name_mander} ${service.lastname_mander}`
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
    name_mander: PropTypes.string.isRequired,
    lastname_mander: PropTypes.string.isRequired
  })).isRequired
};
//3
export default Map;
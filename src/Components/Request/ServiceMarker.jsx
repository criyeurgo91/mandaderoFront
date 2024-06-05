import { useState } from 'react';
import PropTypes from 'prop-types';
import { Marker, InfoWindow } from '@react-google-maps/api';

const ServiceMarker = ({ position, iconUrl, service }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Marker
        position={position}
        icon={{
          url: iconUrl,
          scaledSize: new window.google.maps.Size(50, 50)
        }}
        onClick={handleToggleOpen}
      />
      {isOpen && (
        <InfoWindow position={position} onCloseClick={handleToggleOpen}>
          <div style={{ textAlign: 'center' }}>
            <h2>{service.user}</h2>
            <p>Origen: {service.origin}</p>
            <p>Destino: {service.destination}</p>
            <p>Vehículo: {service.type_vehicle}</p>
            <p>Prioridad: {service.priority ? 'Sí' : 'No'}</p>
            <p>Mandadero: {service.mander}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

ServiceMarker.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  iconUrl: PropTypes.string.isRequired,
  service: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    type_vehicle: PropTypes.string.isRequired,
    priority: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
    mander: PropTypes.string.isRequired
  }).isRequired
};
//5
export default ServiceMarker;

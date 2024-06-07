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
          <div className="p-4 bg-white shadow-lg rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">{service.user}</h2>
            <p className="text-sm text-gray-600"><strong>Origen:</strong> {service.origin}</p>
            <p className="text-sm text-gray-600"><strong>Destino:</strong> {service.destination}</p>
            <p className="text-sm text-gray-600"><strong>Vehículo:</strong> {service.type_vehicle}</p>
            <p className="text-sm text-gray-600"><strong>Prioridad:</strong> {service.priority ? 'Sí' : 'No'}</p>
            <p className="text-sm text-gray-600"><strong>Mandadero:</strong> {service.mander}</p>
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
//3
export default ServiceMarker;

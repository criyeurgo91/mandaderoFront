

import React from 'react';
import realizarcompra from '../../assets/Images/Services/realizarcompra.jpg';
import documentos from '../../assets/Images/Services/documentos.jpg';
import filabancaria from '../../assets/Images/Services/filabancaria.jpg';
import medicamentos from '../../assets/Images/Services/medicamentos.jpg';
import pagofactura from '../../assets/Images/Services/pagofactura.jpg';

const servicios = [
  {
    nombre: 'Realizar una compra',
    imagen: realizarcompra,
    descripcion: 'Nuestro equipo de mandaderos estará siempre a tu disposición para llevar lo que necesitas al lugar que necesites.'
  },
  {
    nombre: 'Filas bancarias',
    imagen: filabancaria,
    descripcion: 'Cansado de esperar largas horas? nuestros mandaderos aran la fila por ti'
  },
  {
    nombre: 'Envio y recoleccion de documentos',
    imagen: documentos,
    descripcion: 'Ya no tienes que preocuparte por salir de casa, mandaderos recoge  tus documentos y los entregara de forma segura y oportuna.'
  },
  {
    nombre: 'Reclamar medicamentos',
    imagen: medicamentos,
    descripcion: 'En mandaderos recogemos tus medicamentos, ya no tienes que esperar largas horas ni realizar filas interminables.'
  },
  {
    nombre: 'Pago de facturas',
    imagen: pagofactura,
    descripcion: 'mandaderos a tu servicio para que tus pagos siempre sean efectuados a tiempo.'
  }
];

const CardService = () => {
  return (
    <div className="container mx-auto mt-8">
      <div className="section-title" data-aos="fade-up">
        <h1 className="text-3xl font-bold text-blue-900 py-8">NUESTROS SERVICIOS</h1>
        
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {servicios.map((servicio, index) => (
          <div key={index} className="card border rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <figure>
              <img src={servicio.imagen} alt={servicio.nombre} className="rounded-t-lg object-cover w-full h-48" />
            </figure>
            <div className="contenido p-4">
              <h3 className="text-lg font-bold mb-2">{servicio.nombre}</h3>
              <p>{servicio.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardService;




import React, { useState, useEffect } from 'react';
import imagenCliente1 from '../../assets/Images/Testimonial/arelis.jpg';
import imagenCliente2 from '../../assets/Images/Testimonial/ary.jpg';
import imagenCliente3 from '../../assets/Images/Testimonial/isabella.jpg';
import '../../ComponentsPublic/Testimonios/Testimonio.css';

const testimonios = [
  {
    id: 1,
    imagen: imagenCliente1,
    nombre: "Arelis Guzman",
    testimonio: "¡Esta app de servicios es increíble! Me ha ahorrado tiempo y esfuerzo al encontrar profesionales confiables para diferentes tareas en mi hogar. Definitivamente la recomiendo."
  },
  {
    id: 2,
    imagen: imagenCliente2,
    nombre: "Ary Cardona",
    testimonio: "Esta app me ha salvado en varias ocasiones. Encontré una persona de confianza para solucionar un problema  en mi casa y el servicio fue rápido y eficiente. Recomiendo esta app a todos los que necesiten servicios confiables."
  },
  {
    id: 3,
    imagen: imagenCliente3,
    nombre: "Isabella Gomez",
    testimonio: "Estoy encantada con esta app de servicios. La utilicé para contratar un servicio de entrega de documentos y el resultado fue impecable. El equipo de entrega fue puntual y amable Definitivamente la usaré nuevamente."
  }
];

const Testimonios = () => {
  const [currentTestimonio, setCurrentTestimonio] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonio((prevTestimonio) =>
        prevTestimonio === testimonios.length - 1 ? 0 : prevTestimonio + 1
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-500 py-16 testimonios-container">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
            ALGUNOS TESTIMONIOS DE NUESTROS CLIENTES
          </h1>
          {testimonios.map((testimonio, index) => (
            <div key={testimonio.id} className={`mt-8 border-t-2 border-blue-200 pt-6 testimonio ${currentTestimonio === index ? 'active' : ''}`}>
              <blockquote className="relative flex items-center">
                <img
                  className="h-16 w-16 rounded-full object-cover border-4 border-white mr-4"
                  src={testimonio.imagen}
                  alt={`Cliente ${testimonio.id}`}
                />
                <div className="relative text-lg leading-9 font-medium text-white">
                  <p>{testimonio.testimonio}</p>
                  <footer className="mt-6">
                    <p className="text-base leading-6 font-medium text-blue-200">
                      {testimonio.nombre}
                    </p>
                  </footer>
                </div>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonios;











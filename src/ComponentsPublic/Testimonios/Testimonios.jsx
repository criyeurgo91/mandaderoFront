
import React from 'react';
import imagenCliente1 from '../../assets/Images/Testimonial/arelis.jpg';
import imagenCliente2 from '../../assets/Images/Testimonial/ary.jpg';
import imagenCliente3 from '../../assets/Images/Testimonial/isabella.jpg';

const Testimonios = () => {
  return (
    <div className="bg-blue-500 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
            ALGUNOS TESTIMONIOS DE NUESTROS CLIENTES
          </h1>
          <div className="mt-6 border-t-2 border-blue-200 pt-6">
            <blockquote className="relative flex items-center">
              <img
                className="h-16 w-16 rounded-full object-cover border-4 border-white mr-4"
                src={imagenCliente1}
                alt="Cliente 1"
              />
              <div className="relative text-lg leading-9 font-medium text-white">
                <p>
                ¡Esta app de servicios es increíble! Me ha ahorrado tiempo y esfuerzo al encontrar profesionales confiables para diferentes tareas en mi hogar. Definitivamente la recomiendo.
                </p>
                <footer className="mt-6">
                  <p className="text-base leading-6 font-medium text-blue-200">
                    Arelis Guzman
                  </p>
                </footer>
              </div>
            </blockquote>
          </div>

          <div className="mt-8 border-t-2 border-blue-200 pt-6">
            <blockquote className="relative flex items-center">
              <img
                className="h-16 w-16 rounded-full object-cover border-4 border-white mr-4"
                src={imagenCliente2}
                alt="Cliente 2"
              />
              <div className="relative text-lg leading-9 font-medium text-white">
                <p>
                Esta app me ha salvado en varias ocasiones. Encontré una persona de confianza para solucionar un problema  en mi casa y el servicio fue rápido y eficiente. Recomiendo esta app a todos los que necesiten servicios confiables.
              
                </p>
                <footer className="mt-6">
                  <p className="text-base leading-6 font-medium text-blue-200">
                    Ary Cardona
                  </p>
                </footer>
              </div>
            </blockquote>
          </div>

          <div className="mt-8 border-t-2 border-blue-200 pt-6">
            <blockquote className="relative flex items-center">
              <img
                className="h-16 w-16 rounded-full object-cover border-4 border-white mr-4"
                src={imagenCliente3}
                alt="Cliente 3"
              />
              <div className="relative text-lg leading-9 font-medium text-white">
                <p>
                Estoy encantada con esta app de servicios. La utilicé para contratar un servicio de entrega de documentos y el resultado fue impecable. El equipo de entrega fue puntual y amable Definitivamente la usaré nuevamente.
                </p>
                <footer className="mt-6">
                  <p className="text-base leading-6 font-medium text-blue-200">
                    Isabella Gomez
                  </p>
                </footer>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonios;







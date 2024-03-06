import React, { useState, useEffect } from 'react';
import { FaFingerprint } from "react-icons/fa";

function Home() {

  const [estadisticas, setEstadisticas] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/estadisticas/')
      .then(response => response.json())
      .then(data => setEstadisticas(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>

      <div className="bg-white-900 text-white flex flex-col min-h-screen p-6 md:p-8 lg:p-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">INICIO</h2>
        </div>
        {estadisticas && (
          <div className="grid gap-4 grid-cols-2 grid-rows-3 px-10 h-full text-lg text-black">
            
            <div className="flex justify-center py-10 rounded-md border-solid border-2 border-black bg-white shadow-2xl shadow-teal-300 hover:cursor-pointer hover:bg-gray-300 transition duration-300">
              <div>
                <figure className="flex justify-center">
                  <FaFingerprint />
                </figure>
                <p className="text-center">Usuarios Registrados en la App </p>
                <span className="flex justify-center underline">{estadisticas.total_users}</span>
              </div>
            </div>
                        
            <div className="flex justify-center py-10 rounded-md border-solid border-2 border-black bg-white shadow-2xl shadow-teal-300 hover:cursor-pointer hover:bg-gray-300 transition duration-300">
              <div>
                <figure className="flex justify-center">
                  <FaFingerprint />
                </figure>
                <p className="text-center">Mandaderos Registrados </p>
                <span className="flex justify-center underline">{estadisticas.total_manders}</span>
              </div>
            </div>
                        
            <div className="flex justify-center py-10 rounded-md border-solid border-2 border-black bg-white shadow-2xl shadow-teal-300 hover:cursor-pointer hover:bg-gray-300 transition duration-300">
              <div>
                <figure className="flex justify-center">
                  <FaFingerprint />
                </figure>
                <p className="text-center">Solicitudes Realizadas </p>
                <span className="flex justify-center underline">{estadisticas.total_requests}</span>
              </div>
            </div>
                        
            <div className="flex justify-center py-10 rounded-md border-solid border-2 border-black bg-white shadow-2xl shadow-teal-300 hover:cursor-pointer hover:bg-gray-300 transition duration-300">
              <div>
                <figure className="flex justify-center">
                  <FaFingerprint />
                </figure>
                <p className="text-center">Solicitudes Pendientes</p>
                <span className="flex justify-center underline">{estadisticas.pending_requests}</span>
              </div>
            </div>
                        
            <div className="flex justify-center py-10 rounded-md border-solid border-2 border-black bg-white shadow-2xl shadow-teal-300 hover:cursor-pointer hover:bg-gray-300 transition duration-300">
              <div>
                <figure className="flex justify-center">
                  <FaFingerprint />
                </figure>
                <p className="text-center">Solicitudes en Proceso</p>
                <span className="flex justify-center underline">{estadisticas.processing_requests}</span>
              </div>
            </div>
                        
            <div className="flex justify-center py-10 rounded-md border-solid border-2 border-black bg-white shadow-2xl shadow-teal-300 hover:cursor-pointer hover:bg-gray-300 transition duration-300">
              <div>
                <figure className="flex justify-center">
                  <FaFingerprint />
                </figure>
                <p className="text-center">Solicitudes Finalizadas </p>
                <span className="flex justify-center underline">{estadisticas.finished_requests}</span>
              </div>
            </div>

            

            {/* Repite el mismo patrón para mostrar el resto de estadísticas */}
          </div>
        )}
      </div>

    </>
  );
}

export default Home;
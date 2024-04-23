import React from 'react'
import { BiCheck } from 'react-icons/bi';
import Funtion from '../../assets/Images/Funtion/funcional.png';

const Function = () => {
  return (
    <div className="container mx-auto">
       <div className="section-title" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-blue-900 py-8">COMO FUNCIONA</h1>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 md:mt-12 lg:mt-16">
        <div className="md:order-2 p-6 rounded-lg shadow-lg" data-aos="fade-up">
          <h3 className='text-2xl font-bold mb-4'>A continuación te mostramos la manera de cómo funciona mandaderos</h3>
          <ul>
            <li className="flex items-center mb-2"><BiCheck className="text-green-500 mr-2" /> Descarga la app ya sea desde nuestra página web o desde tu móvil.</li>
            <li className="flex items-center mb-2"><BiCheck className="text-green-500 mr-2" /> Regístrate.</li>
            <li className="flex items-center mb-2"><BiCheck className="text-green-500 mr-2" /> Elige en nuestra lista de mandados cuál deseas que sea tu mandado a realizar.</li>
            <li className="flex items-center mb-2"><BiCheck className="text-green-500 mr-2" /> Ingresa una dirección de inicio y fin de mandado.</li>
            <li className="flex items-center mb-2"><BiCheck className="text-green-500 mr-2" /> Verifica y acepta el pago de tu mandado.</li>
            <li className="flex items-center mb-2"><BiCheck className="text-green-500 mr-2" /> Finaliza tu mandado.</li>
          </ul>
        </div>
        <div className="md:order-1" data-aos="fade-right">
          <img src={Funtion} className="img-fluid" alt="" />
        </div>
      </div>
    </div>
  
  )
}

export default Function;
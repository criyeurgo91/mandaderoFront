import React from 'react'
import ImgAbout from '../../assets/Images/About/ImgAbout.jpg';

const CardAbout = () => {
  return (
  <div className="container mx-auto px-4 mt-8">
    <h1 className="text-3xl font-bold text-blue-900 py-8">SOBRE NOSOTROS</h1> 
    <div className="bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 bg-gray-200">
          <img src={ImgAbout} alt="Imagen" className="h-full w-full object-cover object-center" />
        </div>
        <div className="lg:w-2/3 p-8">
          <div className="w-9/10"> 
            <div className="col-xl-7 col-lg-6 icon-boxes flex flex-col justify-center py-5 px-lg-5" data-aos="fade-left">
              <h3 className="text-2xl font-bold mb-4">Misión</h3>
              <p className="text-lg mb-6">Establecer soluciones que cubran las necesidades diarias de las personas, ofreciendo un amplio grupo de personas con total disposición a realizar múltiples necesidades de manera confiable, rápida y efectiva.</p>
              <h3 className="text-2xl font-bold mb-4">Visión</h3>
              <p className="text-lg">Nuestra visión es crear una plataforma líder en servicios que conecte de manera efectiva a proveedores y clientes, brindando una experiencia conveniente y confiable para ambas partes. Queremos ser reconocidos como el destino en línea de confianza para todas las necesidades de servicios, impulsando el crecimiento y el éxito tanto de proveedores como de clientes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CardAbout

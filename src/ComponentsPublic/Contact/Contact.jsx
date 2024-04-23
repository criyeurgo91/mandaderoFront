

import React from 'react';

const Contact = () => {
  return (
    <div className="bg-white text-blue-800 py-16">
      <div className="container mx-auto">
        <div className="section-title" data-aos="fade-up">
          <h1 className='text-3xl font-bold text-blue-900 py-8'>NUESTROS CONTACTOS</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
          <div className="flex items-center" data-aos="fade-right" data-aos-delay="100">
            <div className="info">
              <div className="address flex items-center mb-4">
                <svg className="bi bi-geo-alt mr-3 hover:text-green-500" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12 21a.5.5 0 0 0 .5-.5V10a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v10.5a.5.5 0 0 0 .5.5.5.5 0 0 0 .5-.5V11a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v10.5a.5.5 0 0 0 .5.5z"/>
                  <path fillRule="evenodd" d="M7.5 9a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v5zM10 1a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9.27A6.001 6.001 0 0 0 2 15v2a1 1 0 0 0 1 1h1v2.793a1 1 0 0 0 1.707.707L7 20.207l1.646 1.646a1 1 0 0 0 1.414 0L12 20.207l1.93 1.93A1 1 0 0 0 15 22.793V20h1a1 1 0 0 0 1-1v-2a6.001 6.001 0 0 0-3-5.73V1z"/>
                </svg>
                <div>
                  <h4 className='font-bold'>Dirección</h4>
                  <p>Popayan-Cauca, Centro empresarial Iconos, Cra 10 # 15n-59, local 102</p>
                </div>
              </div>
              <div className="email flex items-center mb-4">
                <svg className="bi bi-envelope mr-3 hover:text-green-500" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5H4.5A2.5 2.5 0 0 1 2 18.5v-13zm2-.269v13.768c0 .253.217.434.478.434l14.044-.001a.439.439 0 0 0 .478-.434V5.231L12 10.576 4 5.231zm14 1.449L12 11.424 4 6.08V5.5A1.5 1.5 0 0 1 5.5 4h15a1.5 1.5 0 0 1 1.5 1.5z"/>
                </svg>
                <div>
                  <h4 className='font-bold'>Email:</h4>
                  <p>mandaderos@gmail.com</p>
                </div>
              </div>
              <div className="phone flex items-center mb-4">
                <svg className="bi bi-phone mr-3 hover:text-green-500" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 3a1 1 0 0 1 1 1v12a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1z"/>
                  <path fillRule="evenodd" d="M16 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h8zm-4 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                <div>
                  <h4 className='font-bold'>Teléfono:</h4>
                  <p>57+ 313 5043449 - 57+ 311 7322450</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 mt-5 lg:mt-0" data-aos="fade-left" data-aos-delay="200">
            <form action="forms/contact.php" method="post" role="form" className="php-email-form border border-gray-200 p-6 rounded-lg">
              <div className="grid grid-cols-1 gap-4">
                <div className="form-group">
                  <input type="text" name="name" className="form-control border border-gray-200 p-3 w-full" id="name" placeholder="Tu nombre" required />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control border border-gray-200 p-3 w-full" name="email" id="email" placeholder="Nuestro Email" required />
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control border border-gray-200 p-3 w-full" name="subject" id="subject" placeholder="Asunto" required />
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control border border-gray-200 p-3 w-full" name="message" rows="5" placeholder="Mensaje" required></textarea>
              </div>
              <div className="text-center"><button type="submit" className="bg-green-500 text-white hover:bg-blue-500 hover:text-white py-2 px-4 rounded">Enviar</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;




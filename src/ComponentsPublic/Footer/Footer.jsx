import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

 const navigate = useNavigate();

 const handleClick = () => {
    navigate('/login');
  };
  return (
    <footer className="bg-blue-800 text-white">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="footer-info">
              <h3 className="text-xl font-bold mb-4">Mandaderos</h3>
              <p className="pb-3"><em>En nuestra app mandaderos nuestros clientes, nuestra prioridad</em></p>
              <p>
                Popayan-Cauca, Centro empresarial Iconos, Cra 10 # 15n-59, local 102 <br/><br/><br/>                 
                <strong>Celular:</strong> 57+ 313 5043449 - 57+ 311 7322450 <br/>
                <strong>Email:</strong> mandaderos@gmail.com<br/>
              </p>
              <div className="social-links mt-3">
                <a href="#" className="text-blue-400 hover:text-blue-600 mr-4">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600 mr-4">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600 mr-4">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600 mr-4">
                  <i className="fab fa-google-plus"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="footer-links">
              <h4 className="text-lg font-bold mb-4">Otros links</h4>
              <ul>
                <li className="mb-2"><i className="fas fa-chevron-right mr-2"></i><a href="#">Home</a></li>
                <li className="mb-2"><i className="fas fa-chevron-right mr-2"></i><a href="#">Nosotros</a></li>
                <li className="mb-2"><i className="fas fa-chevron-right mr-2"></i><a href="#">Servicios</a></li>
                <li className="mb-2"><i className="fas fa-chevron-right mr-2"></i><a href="#">Términos de servicio</a></li>
                <li><i className="fas fa-chevron-right mr-2"></i><a href="#">Política de privacidad</a></li>
              </ul>
            </div>
          </div>

          <div className="col-span-1">
            <div className="footer-links">
              <h4 className="text-lg font-bold mb-4">Otros servicios</h4>
              <ul>
                <li className="mb-2"><i className="fas fa-chevron-right mr-2"></i><a href="#">Diseño web</a></li>
                <li className="mb-2"><i className="fas fa-chevron-right mr-2"></i><a href="#">Desarrollador web</a></li>
                <li className="mb-2"><i className="fas fa-chevron-right mr-2"></i><a href="#">Gestión de productos</a></li>
                <li className="mb-2"><i className="fas fa-chevron-right mr-2"></i><a href="#">Marketing</a></li>
                <li><i className="fas fa-chevron-right mr-2"></i><a href="#">Diseño gráfico</a></li>
              </ul>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="footer-newsletter">
              <h4 className="text-lg font-bold mb-4">Nuestro boletín</h4>
              <p>Nuestro compromiso la mejor carta de presentación ¡compruébalo!</p>
              <form action="" method="post" className="mt-4 space-x-4">
                <input type="email" name="email" className="border border-gray-300 p-2 rounded mr-2" placeholder="Tu correo electrónico" required />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-bold">Suscribirse</button>
                <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold  px-4 rounded p-2"> Administrador</button>
                
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-400 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; Derechos de autor <strong>Mandaderos</strong>. Todos los derechos reservados</p>
          <p className="text-sm mt-1">Diseñada por <a href="#" className="text-blue-400 hover:text-blue-600">Mandaderos Company</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

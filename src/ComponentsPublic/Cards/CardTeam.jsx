
import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Israel from '../../assets/Images/Team/Israel1.jpg';
import John from '../../assets/Images/Team/John1.jpg';
import CristianUrbano from '../../assets/Images/Team/Cristianurbano1.jpg';
import CristianSilva from '../../assets/Images/Team/Cristiansilva1.jpg';
import Lennin from '../../assets/Images/Team/Lenin1.jpg';

const team = [
  {
    nombre: 'Israel gomez',
    imagen: Israel,
    descripcion: 'Mandadero'
  },
  {
    nombre: 'John Quimbaya',
    imagen: John,
    descripcion: 'Mandadero'
  },
  {
    nombre: 'Cristian Urbano',
    imagen: CristianUrbano,
    descripcion: 'Mandadero'
  },
  {
    nombre: 'Cristian Silva',
    imagen: CristianSilva,
    descripcion: 'Mandadero'
  },
  {
    nombre: 'Lennin Montilla',
    imagen: Lennin,
    descripcion: 'Mandadero'
  },
];

const CardTeam = () => {
  return (
    <div className="container mx-auto mt-8">
      <div className="section-title" data-aos="fade-up">
        <h1 className="text-3xl font-bold text-blue-900 py-8">NUESTRO EQUIPO</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {team.map((equipo, index) => (
          <div key={index} className="card border rounded-lg shadow-md hover:shadow-xl transition duration-300 relative flex flex-col justify-center">
            <figure>
              <img src={equipo.imagen} alt={equipo.nombre} className="rounded-t-lg" />
            </figure>
            <div className="contenido p-4 text-center">
              <h3 className="text-lg font-bold mb-2">{equipo.nombre}</h3>
              <p className="mb-2">{equipo.descripcion}</p>
              <div className="redes-sociales flex justify-center">
                <a href="#" className="social-link mr-2 text-blue-500"><FaTwitter /></a>
                <a href="#" className="social-link mr-2 text-blue-500"><FaFacebook /></a>
                <a href="#" className="social-link mr-2 text-pink-500"><FaInstagram /></a>
                <a href="#" className="social-link text-blue-700"><FaLinkedin /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardTeam;









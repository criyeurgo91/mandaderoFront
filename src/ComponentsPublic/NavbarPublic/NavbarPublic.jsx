
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarPublic = () => {
  const [navbarFixed, setNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarFixed(true);
      } else {
        setNavbarFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 50; 
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`bg-blue-800 p-4 ${navbarFixed ? 'fixed top-0 w-full' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Mandaderos</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300" onClick={() => scrollToSection('home')}>Home</Link>
          <Link to="/about" className="text-white hover:text-gray-300" onClick={() => scrollToSection('about')}>Nosotros</Link>
          <Link to="/service" className="text-white hover:text-gray-300" onClick={() => scrollToSection('service')}>Servicios</Link>
          <Link to="/function" className="text-white hover:text-gray-300" onClick={() => scrollToSection('function')}>Como funciona</Link>
          <Link to="/gallery" className="text-white hover:text-gray-300" onClick={() => scrollToSection('gallery')}>Galería</Link>
          <Link to="/team" className="text-white hover:text-gray-300" onClick={() => scrollToSection('team')}>Equipo</Link>
          <Link to="/contact" className="text-white hover:text-gray-300" onClick={() => scrollToSection('contact')}>Contacto</Link>
        </div>
      </div>
    </nav>
    
  );
};

export default NavbarPublic;








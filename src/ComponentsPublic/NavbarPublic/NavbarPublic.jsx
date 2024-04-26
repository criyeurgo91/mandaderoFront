
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarPublic = () => {
  const [navbarFixed, setNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
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
      const offset = element.offsetTop - 30; 
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`bg-blue-800 p-4 ${navbarFixed ? 'fixed top-0 w-full' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Mandaderos</div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-green-500 font-bold" onClick={() => scrollToSection('home') }>Home</Link>
          <Link  className="text-white hover:text-green-500 font-bold" onClick={() => scrollToSection('about')}>Nosotros</Link>
          <Link  className="text-white hover:text-green-500 font-bold" onClick={() => scrollToSection('service')}>Servicios</Link>
          <Link  className="text-white hover:text-green-500 font-bold" onClick={() => scrollToSection('function')}>Como funciona</Link>
          <Link  className="text-white hover:text-green-500 font-bold" onClick={() => scrollToSection('gallery')}>Galería</Link>
          <Link  className="text-white hover:text-green-500 font-bold" onClick={() => scrollToSection('team')}>Equipo</Link>
          <Link  className="text-white hover:text-green-500 font-bold" onClick={() => scrollToSection('contact')}>Contacto</Link>
        </div>
      </div>
    </nav>
    
  );
};

export default NavbarPublic;






















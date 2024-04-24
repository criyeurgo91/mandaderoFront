
import React from 'react';
import backgroundImage from '../../assets/Images/home/fondoinicio3.png';
import '../../ComponentsPublic/HomeLanding/Home.css'; 

const Home = () => {
  return (
    <section className="relative h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 home-content">
        <h1 className="text-white text-3xl md:text-5xl ml-8 mt-8 font-bold">Solicita tu servicio</h1>
        <h1 className="text-white text-3xl md:text-5xl ml-8 mt-8 font-bold">con confianza</h1>
      </div>
    </section>
  );
};

export default Home;





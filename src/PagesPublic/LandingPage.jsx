import CardAbout from '../ComponentsPublic/Cards/CardAbout';
import CardService from '../ComponentsPublic/Cards/CardService';
import CardTeam from '../ComponentsPublic/Cards/CardTeam';
import Home from '../ComponentsPublic/HomeLanding/Home';
import Function from '../ComponentsPublic/Function/Function';
import CardGallery from '../ComponentsPublic/Cards/CardGallery';
import Testimonios from '../ComponentsPublic/Testimonios/Testimonios';
import Contact from '../ComponentsPublic/Contact/Contact';
import Footer from '../ComponentsPublic/Footer/Footer';

const LandingPage = () => {
 
  return (
    <div className='mt-10 space-y-14'>
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <CardAbout />
      </section>
      <section id="service">
        <CardService />
      </section>
      <section id="function">
        <Function />
      </section>
      <section id="gallery">
        <CardGallery />
      </section>
      <section id="">
        <Testimonios />
      </section>
      <section id="team">
        <CardTeam />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="">
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;

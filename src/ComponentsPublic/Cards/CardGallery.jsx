import React from "react";
import image1 from "../../assets/Images/gallery/mandado1.jpg";
import image2 from "../../assets/Images/gallery/mandado2.jpg";
import image3 from "../../assets/Images/gallery/mandado3.jpg";
import image4 from "../../assets/Images/gallery/mandado4.jpg";
import image5 from "../../assets/Images/gallery/mandado5.jpg";
import image6 from "../../assets/Images/gallery/mandado6.jpg";
import image7 from "../../assets/Images/gallery/mandado7.jpg";
import image8 from "../../assets/Images/gallery/mandado8.jpg";

const images = [image1, image2, image3, image4, image5, image6, image7, image8];

const CardGallery = () => {
  return (
    <div className="container mx-auto p-4">
        <div className="section-title" data-aos="fade-up">
        <h1 className="text-3xl font-bold text-blue-900 py-8">AQUI UN POCO DE NUESTRO DIA A DIA</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="rounded-lg shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default CardGallery;


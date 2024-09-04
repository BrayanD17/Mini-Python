import React from 'react';
import { Mail, MapPin, Phone, Linkedin, Github, Facebook, Instagram } from 'lucide-react';
import '../css/Contact.css';
import brayanImage from '../image/brayan.png';
import nicoleImage from '../image/nicole.jpeg'

const Contact = () => {
  return (
    <div className="contact-info">
      <div className="info-brayan">
        <div className="contact-header">
          <img src={brayanImage} alt="Brayan Gutierrez Dinarte" className="contact-image" />
          <h2 className="contact-name">Brayan Gutierrez Dinarte</h2>
        </div>
        <div className="contact-details">
          <p>
            <Phone /> 
            <a href="https://wa.me/50683340869" target="_blank" rel="noopener noreferrer">+506 8334 0869</a>
          </p>
          <p>
            <Mail /> 
            <a href="mailto:dinartebryan17@gmail.com">dinartebryan17@gmail.com</a>
          </p>                    
          <p>
            <MapPin /> San Carlos, Alajuela, Costa Rica
          </p>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/brayan-josue-gutierrez-dinarte-280441165/" target="_blank" rel="noopener noreferrer" className="linkedin">
            <Linkedin />
          </a>
          <a href="https://github.com/BrayanD17" target="_blank" rel="noopener noreferrer" className="github">
            <Github />
          </a>
          <a href="https://www.facebook.com/brayan.dinarte.1?locale=es_LA" target="_blank" rel="noopener noreferrer" className="facebook">
            <Facebook />
          </a>
          <a href="https://www.instagram.com/dinartebrayan/" target="_blank" rel="noopener noreferrer" className="instagram">
            <Instagram />
          </a>
        </div>
      </div>

      <div className="info-nicole">
      <div className="contact-header">
          <img src={nicoleImage} alt="Nicole Marin Vallejos" className="contact-image" />
          <h2 className="contact-name">Nicole Marin Vallejos</h2>
        </div>
        <div className="contact-details">
          <p>
            <Phone /> 
            <a href="https://wa.me/50686047013" target="_blank" rel="noopener noreferrer">+506 8604 7013</a>
          </p>
          <p>
            <Mail /> 
            <a href="mailto:nmarinvallejos@gmail.com">nmarinvallejos@gmail.com</a>
          </p>                    
          <p>
            <MapPin /> San Carlos, Alajuela, Costa Rica
          </p>
        </div>
        <div className="social-links">
          <a href="https://github.com/NicoMa11" target="_blank" rel="noopener noreferrer" className="github">
            <Github />
          </a>
          <a href="https://www.facebook.com/share/Cd7s5A5D5vqitwbJ/?mibextid=qi2Omg" target="_blank" rel="noopener noreferrer" className="facebook">
            <Facebook />
          </a>
          <a href="https://www.instagram.com/nicomarin11?igsh=MTNzeGYzOWR3c3Z2MA==" target="_blank" rel="noopener noreferrer" className="instagram">
            <Instagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;

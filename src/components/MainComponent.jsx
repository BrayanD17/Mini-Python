import React, { useState } from 'react';
import NavBar from '../components/Navbar'; // Corregido el nombre del archivo
import ContactComponent from '../components/Contact';
import CodeEditorPanel from '../components/CodeEditorPanel';
import About from '../components/About'; // Importa el componente About

const MainComponent = () => {
  // Establece 'IDE' como el componente activo por defecto
  const [activeComponent, setActiveComponent] = useState('IDE');

  const handleNavClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div>
      <NavBar onNavClick={handleNavClick} />
      {activeComponent === 'IDE' && <CodeEditorPanel />}
      {activeComponent === 'Contact' && <ContactComponent />}
      {activeComponent === 'About' && <About />} {/* Añadido el componente About */}
    </div>
  );
};

export default MainComponent;

import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import ContactComponent from '../components/Contact';
import CodeEditorPanel from '../components/CodeEditorPanel';

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
    </div>
  );
};

export default MainComponent;

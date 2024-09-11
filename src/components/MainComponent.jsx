import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import ContactComponent from '../components/Contact';
import CodeEditorPanel from '../components/CodeEditorPanel';
import About from '../components/About'

const MainComponent = () => {
  const [activeComponent, setActiveComponent] = useState('IDE');

  const handleNavClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div>
      <NavBar onNavClick={handleNavClick} />
      {activeComponent === 'IDE' && <CodeEditorPanel />}
      {activeComponent === 'Contact' && <ContactComponent />}
      {activeComponent === 'About' && <About />}
    </div>
  );
};

export default MainComponent;

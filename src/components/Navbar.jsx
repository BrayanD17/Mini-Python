import React from 'react';
import '../css/NavBar.css';
import logo from '../image/MiniPython.png';

const NavBar = ({ onNavClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="MiniPython Logo" className="logo" />
        <span className="navbar-title">Mini-python IDE online</span>
      </div>
      <ul className="navbar-menu">
        <li><a href="#ide" onClick={() => onNavClick('IDE')}>IDE</a></li>
        <li><a href="#contact" onClick={() => onNavClick('Contact')}>Contact</a></li>
        <li><a href="#about" onClick={() => onNavClick('About')}>About</a></li> 
      </ul>
    </nav>
  );
};

export default NavBar;

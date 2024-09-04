import React from 'react';
import '../css/NavBar.css';
import logo from '../image/MiniPython.png';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="MiniPython Logo" className="logo" />
        <span className="navbar-title">Mini-python IDE online</span>
      </div>
      <ul className="navbar-menu">
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;

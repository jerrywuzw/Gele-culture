import React, { useState } from 'react';
import '../assets/css/navbar.css';
import geleLogo from '../assets/Gele-logo.png';
import geleTitle from '../assets/Gele-title.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Left: Logo and Title */}
      <div className="logo-title">
        <img src={geleLogo} alt="Gele Logo" className="logo" />
        <img src={geleTitle} alt="Gele Title" className="title" />
      </div>

      {/* Right: Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Dropdown Menu */}
      <ul className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
        <li><a href="#home">HOME</a></li>
        <li><a href="#agenda">AGENDA</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

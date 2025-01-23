// src/components/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/navbar.css';
import geleLogo from '../assets/Gele-logo.png';
import geleTitle from '../assets/Gele-title.png';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('section1');

  const navbarRef = useRef(null);
  const prevScrollPos = useRef(window.pageYOffset);
  const translateY = useRef(0); // Current translateY value

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const delta = currentScrollPos - prevScrollPos.current;
      prevScrollPos.current = currentScrollPos;

      if (navbarRef.current) {
        const navbarHeight = navbarRef.current.offsetHeight;

        // Update translateY based on scroll direction and delta
        if (delta > 0) {
          // Scrolling down
          translateY.current = Math.min(translateY.current + delta, navbarHeight);
        } else {
          // Scrolling up
          translateY.current = Math.max(translateY.current + delta, 0);
        }

        // Apply the transform
        navbarRef.current.style.transform = `translateY(-${translateY.current}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.home-section');

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
        markers: false, // Set to true for debugging
      });
    });

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToSection = (id) => {
    gsap.to(window, { duration: 1, scrollTo: `#${id}` });
    setIsMenuOpen(false); // Close menu after clicking
  };

  return (
    <nav className="navbar" ref={navbarRef}>
      {/* Left: Logo and Title */}
      <div className="logo-title">
        <img src={geleLogo} alt="Gele Logo" className="logo" />
        <img src={geleTitle} alt="Gele Title" className="title" />
      </div>

      {/* Right: Hamburger Icon */}
      <div
        className="hamburger"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleMenu();
          }
        }}
      >
        ☰
      </div>

      {/* Dropdown Menu */}
      <ul className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <button
            className={activeSection === 'section1' ? 'active' : ''}
            onClick={() => scrollToSection('section1')}
          >
            HOME
          </button>
        </li>
        <li>
          <button
            className={activeSection === 'section2' ? 'active' : ''}
            onClick={() => scrollToSection('section2')}
          >
            VIDEO
          </button>
        </li>
        <li>
          <button
            className={activeSection === 'section3' ? 'active' : ''}
            onClick={() => scrollToSection('section3')}
          >
            MORE
          </button>
        </li>
        <li>
          <button
            className={activeSection === 'section4' ? 'active' : ''}
            onClick={() => scrollToSection('section4')}
          >
            CONTACT
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

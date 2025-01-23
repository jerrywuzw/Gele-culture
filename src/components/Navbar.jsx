// src/components/Navbar.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../assets/css/navbar.css';
import geleLogo from '../assets/Gele-logo.png';
import geleTitle from '../assets/Gele-title.png';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import throttle from 'lodash.throttle';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('section1');
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const navbarRef = useRef(null);
  const prevScrollPos = useRef(window.pageYOffset);
  const menuRef = useRef(null);
  const translateY = useRef(0); // Current translateY value

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // Define handleScroll using useCallback outside useEffect
  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollPos = window.pageYOffset;
      const delta = currentScrollPos - prevScrollPos.current;
      prevScrollPos.current = currentScrollPos;

      // Debugging: Log scroll position and delta
      console.log(`Scroll Position: ${currentScrollPos}, Delta: ${delta}`);

      if (delta > 0 && currentScrollPos > 100) {
        // Scrolling down and scrolled more than 100px
        if (!isNavbarHidden) {
          console.log('Hiding Navbar');
          setIsNavbarHidden(true);
        }
        if (isMenuOpen) {
          console.log('Closing menu due to scroll down');
          setIsMenuOpen(false);
        }
      } else if (delta < 0) {
        // Scrolling up
        if (isNavbarHidden) {
          console.log('Showing Navbar');
          setIsNavbarHidden(false);
        }
      }
    }, 100),
    [isNavbarHidden, isMenuOpen]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel(); // Cancel any pending throttled calls
    };
  }, [handleScroll]);

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

  useEffect(() => {

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);


  return (
    <nav className={`navbar ${isNavbarHidden ? 'hidden' : ''}`} ref={navbarRef}>
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
            ENTRANCE
          </button>
        </li>
        <li>
          <button
            className={activeSection === 'section2' ? 'active' : ''}
            onClick={() => scrollToSection('section2')}
          >
            AGENDA
          </button>
        </li>
        <li>
          <button
            className={activeSection === 'section3' ? 'active' : ''}
            onClick={() => scrollToSection('section3')}
          >
            RHYTHM
          </button>
        </li>
        <li>
          <button
            className={activeSection === 'section4' ? 'active' : ''}
            onClick={() => scrollToSection('section4')}
          >
            SOCIAL
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

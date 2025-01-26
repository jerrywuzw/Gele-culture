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
  const menuRef = useRef(null); // Reference to the menu for click outside
  const prevScrollPos = useRef(window.pageYOffset);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Handle Scroll: Hide/Show Navbar and Close Menu on Scroll Down
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
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel(); // Cancel any pending throttled calls
    };
  }, [handleScroll]);

  // ScrollTrigger to update activeSection based on scroll position
  useEffect(() => {
    const sections = document.querySelectorAll('.section');

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

  // Function to scroll to a specific section
  const scrollToSection = (id) => {
    gsap.to(window, { duration: 1, scrollTo: `#${id}` });
    setIsMenuOpen(false); // Close menu after clicking
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !navbarRef.current.contains(event.target)
      ) {
        console.log('Click outside detected. Closing menu.');
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        console.log('Escape key pressed. Closing menu.');
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isNavbarHidden ? 'hidden' : ''}`} ref={navbarRef}>
      {/* LOGO + TITLE */}
      <div className="logo-title">
        <img src={geleLogo} alt="Gele Logo" className="logo" />
        <img src={geleTitle} alt="Gele Title" className="title" />
      </div>

      {/* HAMBURGER ICON */}
      <button
        className="hamburger"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
      >
        ☰
      </button>

      {/* DROPDOWN MENU */}
      <ul className={`menu-items ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <li>
          <button
            className={activeSection === 'section1' ? 'active' : ''}
            onClick={() => scrollToSection('section1')}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={activeSection === 'section2' ? 'active' : ''}
            onClick={() => scrollToSection('section2')}
          >
            Agenda
          </button>
        </li>
        <li>
          <button
            className={activeSection === 'section3' ? 'active' : ''}
            onClick={() => scrollToSection('section3')}
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

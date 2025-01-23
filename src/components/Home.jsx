// src/components/Home.jsx

import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/home.css';
import homepageVideo from '../assets/videos/Homepage-video.mp4'; // Imported video
import videoSrc from '../assets/videos/logoSpin.mp4'; // Existing video for Section 2
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const sectionsRef = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const sections = sectionsRef.current;

    // Create ScrollTriggers for each section to detect active section
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection(index),
        onEnterBack: () => setActiveSection(index),
        // markers: true, // Enable for debugging
      });

      // Animate content within each section
      const content = section.querySelector('.content');

      gsap.fromTo(
        content,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            // markers: true, // Enable for debugging
          },
        }
      );
    });

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${scrolled}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to section when indicator is clicked
  const scrollToSection = (index) => {
    sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page">

      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div className="progress-bar" ref={progressBarRef}></div>
      </div>


      {/* Section 1 */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        id="section1"
        className="home-section section1"
      >
        {/* Background Video */}
        <video
          className="background-video"
          src={homepageVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        ></video>

        {/* Overlay for better text readability */}
        <div className="video-overlay"></div>

        {/* Content */}
      </section>

      {/* Section 2 - Video Section */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        id="section2"
        className="home-section section2"
      >
        <div className="content">
          <video
            className="homepage-video"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="video-description">This video scrolls over the background color.</p>
        </div>
      </section>

      {/* Section 3 - More Stuff */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        id="section3"
        className="home-section section3"
      >
        <div className="content">
          <h2>More Sections</h2>
          <p>
            Add as much content as you like. Each new section will scroll over the background color.
          </p>
          <div className="filler">
            <p>Extra filler space to demonstrate scrolling...</p>
          </div>
        </div>
      </section>

      {/* Section 4 - Another Section */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        id="section4"
        className="home-section section4"
      >
        <div className="content">
          <h2>Another Section</h2>
          <p>
            More content here. Continue adding sections as needed.
          </p>
          <div className="filler">
            <p>More filler space to demonstrate scrolling...</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;

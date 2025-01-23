// src/components/Home.jsx

import React, { useEffect, useRef } from 'react';
import '../assets/css/home.css';
import videoSrc from '../assets/videos/logoSpin.mp4'; // Ensure this path is correct
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (!section) return;

      const content = section.querySelector('.content');

      // Animate content: fade in and slide up
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
            start: 'top center',
            toggleActions: 'play none none reverse',
            markers: true, // Enable for debugging
          },
        }
      );

      // Pin the section during its scroll duration
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        scrub: true,
        markers: true, // Enable for debugging
      });
    });

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const progressBar = document.getElementById('progress-bar');

    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    };

    window.addEventListener('scroll', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div className="home-page">
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div className="progress-bar" id="progress-bar"></div>
      </div>
      
      {/* Section 1 */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        id="section1"
        className="home-section section1"
      >
        <div className="content">
          <h1>Is 他妈的</h1>
          <h2>Lifestyle</h2>
        </div>
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

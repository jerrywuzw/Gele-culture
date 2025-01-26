// src/components/Home.jsx

import React, { useEffect } from 'react';
import Section from './Section';
import '../assets/css/home.css'; // Import any additional CSS if needed
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import your media assets
import homepageVideo from '../assets/videos/Homepage-video.mp4';
import logoSpinVideo from '../assets/videos/logoSpin.mp4';

function Home() {
  const sectionsData = [
    {
      id: 'section1',
      title: null,
      content: null,
      media: homepageVideo,
      mediaType: 'video',
      backgroundColor: '#000',
      animationDirection: 'up',
    },
    {
      id: 'section2',
      title: null,
      content: null,
      media: logoSpinVideo,
      mediaType: 'video',
      backgroundColor: '#000',
      animationDirection: 'left',
    },
    {
      id: 'section3',
      title: '', // No title for the plain black section
      content: '', // No content
      media: null, // No media
      backgroundColor: '#000', // Black background
      animationDirection: 'down',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    sectionsData.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top top',
        end: '+=100%', // Pin for the duration of one viewport height
        pin: true,
        scrub: false, // Disable scrub to prevent linking animation progress to scrollbar
        pinSpacing: false, // Remove spacing to allow next section to overlay smoothly
        // markers: true, // Uncomment for debugging
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [sectionsData]);

  return (
    <div className="home-page">
      {sectionsData.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          content={section.content}
          media={section.media}
          mediaType={section.mediaType}
          backgroundColor={section.backgroundColor}
          animationDirection={section.animationDirection}
        />
      ))}
    </div>
  );
}

export default Home;

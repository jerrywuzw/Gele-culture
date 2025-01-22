import React from 'react';
import '../assets/css/home.css'; // Adjusted path for CSS
import videoSrc from '../assets/videos/logoSpin.mp4';
import lifestyleImg from '../assets/lifestyle.png';

const Home = () => {
  return (
    <div className="home-container">
      {/* Lifestyle Image Section */}
      <div className="image-wrapper">
        <img
          src={lifestyleImg}
          alt="Lifestyle"
          className="lifestyle-image"
        />
        <div className="content-overlay">
          <h1>LA PROGRAMMATION DE JANVIER</h1>
          <p>Bonne année ! La programmation de janvier est là, on a trop hâte.</p>
          <a href="https://www.pointephemere.org/agenda" className="more-info-link">→ Plus d'infos</a>
        </div>
      </div>

      {/* Video Section */}
      <div className="video-wrapper">
        <video
          className="homepage-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Home;

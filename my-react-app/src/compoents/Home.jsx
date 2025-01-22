import React from 'react';
import Navbar from '../Navbar'; // Adjust the path as needed
import './home.css';
import videoSrc from '../assets/videos/logoSpin.mp4'; // Adjusted path for video

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <main className="main-content">
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
        <h1>Welcome to Gele</h1>
        <p>This is the homepage content.</p>
      </main>
    </div>
  );
};

export default Home;

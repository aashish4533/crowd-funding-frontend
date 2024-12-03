// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; // Import CSS for the homepage component

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Crowd Funding Platform</h1>
      <p>
        Empowering ideas and turning dreams into reality. Join our community and make a difference today!
      </p>
      <div className="buttons">
        <Link to="/signin" className="button">Sign In</Link>
        <Link to="/signup" className="button">Sign Up</Link>
      </div>
    </div>
  );
};

export default HomePage;

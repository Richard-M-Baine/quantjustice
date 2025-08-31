import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{
      height: '16vh', // Takes up top 20% of viewport height
      backgroundColor: '#333', // Dark background for visibility
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'sticky',
  
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000, // Ensures it stays above other content
    }}>
      <h2>NavBar</h2>
      <div>
        <Link to="/test" style={{ color: 'white', margin: '0 20px', textDecoration: 'none' }}>Test</Link>
        <Link to="/county" style={{ color: 'white', margin: '0 20px', textDecoration: 'none' }}>County</Link>
      </div>
    </nav>
  );
};

export default NavBar
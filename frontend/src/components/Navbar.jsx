import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar({ onOpenCalc }) {
  return (
    <nav>
      <Link to="/" className="nav-logo">🌿 Health-o-meter</Link>
      
      <div className="nav-right" style={{ gap: '0.5rem' }}>
        <Link to="/meals" className="nav-link">🍱 Meals</Link>
        <Link to="/exercise" className="nav-link">🏋️ Exercise</Link>
        
        <div className="nav-divider"></div>
        
        <Link to="/tracker" className="nav-link">Track Your Progress</Link>
        
        <button className="nav-calc-btn" onClick={onOpenCalc}>🧮 BMI / BMR</button>
      </div>
    </nav>
  );
}
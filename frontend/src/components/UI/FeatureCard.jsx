import React from 'react';
import { Link } from 'react-router-dom';

export default function FeatureCard({ image, badge, title, description, linkTo, linkText }) {
  return (
    <div className="dash-card">
      <div className="dash-card-img">
        <img src={image} alt={title} />
        <span className="dash-badge">{badge}</span>
      </div>
      <div className="dash-card-body">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={linkTo} className="dash-link">{linkText}</Link>
      </div>
    </div>
  );
}
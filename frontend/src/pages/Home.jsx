import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/UI/FeatureCard';
import '../styles/Home.css'; // Importing the specific styles for this page

export default function Home() {
  return (
    <div className="dash-wrapper">
      <div className="dash-grid">
        
        {/* LEFT COLUMN: Text & Actions */}
        <div className="dash-text">
          <h1 className="dash-title">Health-o-meter</h1>
          <p className="dash-eyebrow">Simplifying Health metrics</p>
          <p className="dash-sub">
            Track your daily metrics, explore customized Indian meal plans, and find the perfect workout routine for your age and goals.
          </p>
          <div className="dash-btns">
            <Link to="/tracker" className="btn-outline">Open Tracker</Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Stacked Cards */}
        <div className="dash-cards">
          <FeatureCard 
            image="/thali.jpg"
            title="India and its food"
            description="Throughout the history India has been known for its food and even today it is 
            widely famous. But due to the famines and catastrophy Indian people have face thier diet mainly consisetd of the 
            fats heavy food to store energt. But in the modern day those eating practices cause the negatifve effect on us .
            The Chole Bhature and Aloo da Paratha is more dangerous than ever . And we need to celebrate as well incorporate this 
            diverse eating habbit. Cause as move from East to West , North to South the Indian food rapidly as its weather."
          />
          <FeatureCard 
            image="/exceris.jpg"
            title="Fitness/ Vyayam"
            description="In todays stressful environment where there increased pollution, stress at works , bad eating habbits
            or any other reason , exercise is a scientific proven method to improve the quality of lime by tremendous amount/
            This is not even India specific thing we all need to do move our body for it proper funcioning. And each age group can 
            can do different exercise as each one of us have different genes and starting point . One man can do 50 pushups while an old 
            lady could hardly walk a mile . So we need to understand the exercise from the basics"
          />
        </div>

      </div>
      
      {/* LOCKED FOOTER */}
      <footer className="dash-footer">
        <p>Health-o-meter</p>
      </footer>
    </div>
  );
}
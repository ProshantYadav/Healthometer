import React from 'react';

export default function MealSidebar({ 
  activeCategory, setActiveCategory, 
  targetDay, setTargetDay, daysOfWeek, 
  showForm, onToggleForm 
}) {
  return (
    <div className="meals-sidebar">
      <div>
        <h3 className="sidebar-heading">Categories</h3>
        <div className="filter-list">
          {['all', 'keto', 'vegan', 'vegetarian', 'regional'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat} Diet
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="sidebar-heading">Planning For</h3>
        <select 
          value={targetDay} 
          onChange={(e) => setTargetDay(e.target.value)}
          className="day-select"
        >
          {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
        </select>
      </div>

      <button 
        onClick={onToggleForm} 
        className="btn-outline sidebar-add-btn" 
      >
        {showForm ? 'Cancel Recipe' : '+ Add Custom Recipe'}
      </button>
    </div>
  );
}
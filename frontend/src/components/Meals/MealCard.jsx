import React from 'react';

export default function MealCard({ meal, targetDay, onSaveToDay, isLimitReached }) {
  return (
    <div className="dash-card meal-card">
      <div className="meal-card-header">
        <h3 className="meal-card-title">{meal.title}</h3>
        <span className="meal-card-badge">{meal.calories}</span>
      </div>
      
      {meal.ytLink && (
        <a href={meal.ytLink} target="_blank" rel="noopener noreferrer" className="meal-card-link">
          ▶ Watch Recipe
        </a>
      )}

      <p className="meal-card-desc">{meal.desc}</p>
      
      <button
        onClick={() => onSaveToDay(meal)}
        className="btn-outline meal-card-btn"
        disabled={isLimitReached}
      >
        {isLimitReached ? 'Limit exceeded for the day' : `+ Add to ${targetDay}`}
      </button>
    </div>
  );
}
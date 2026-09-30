import React from 'react';

export default function MealPlanner({ daysOfWeek, savedMeals, onRemoveMeal }) {
  return (
    <div className="planner-container">
      <h3 className="planner-title">🍛 Mera Bhojan Planner</h3>
      <div className="planner-grid">
        {daysOfWeek.map(day => {
          const dayMeals = savedMeals.filter(m => m.day === day);
          return (
            <div key={day} className="planner-day">
              <h4 className="planner-day-title">{day}</h4>
              {dayMeals.length === 0 ? (
                <p className="planner-empty">No meals planned.</p>
              ) : (
                <div className="planner-meal-list">
                  {dayMeals.map(item => (
                    <div key={item.uniqueId} className="planner-meal">
                      <div className="planner-meal-info">
                        <span className="planner-meal-name">{item.meal.title}</span>
                        <span className="planner-meal-cals">{item.meal.calories}</span>
                      </div>
                      <button 
                        onClick={() => onRemoveMeal(item.uniqueId)}
                        className="remove-btn"
                        title="Remove Meal"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
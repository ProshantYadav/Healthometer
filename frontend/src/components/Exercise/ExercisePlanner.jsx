import React from 'react';

export default function ExercisePlanner({ daysOfWeek, savedExercises, onRemoveExercise }) {
  return (
    <div className="planner-container">
      <h3 className="planner-title">Weekly Workout Routine</h3>
      <div className="planner-grid">
        {daysOfWeek.map(day => {
          // Now correctly filtering the savedExercises array
          const dayExercises = savedExercises.filter(ex => ex.day === day);

          return (
            <div key={day} className="planner-day">
              <h4 className="planner-day-title">{day}</h4>
              
              {dayExercises.length === 0 ? (
                <p className="planner-empty">Rest day</p>
              ) : (
                <div className="planner-meal-list">
                  {dayExercises.map(item => (
                    <div key={item.uniqueId} className="planner-meal">
                      <div className="planner-meal-info">
                        <span className="planner-meal-name">{item.exercise.title}</span>
                        <span className="planner-meal-cals">{item.exercise.intensity} Intensity</span>
                      </div>
                      <button 
                        onClick={() => onRemoveExercise(item.uniqueId)}
                        className="remove-btn"
                        title="Remove Exercise"
                      >
                        ×
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
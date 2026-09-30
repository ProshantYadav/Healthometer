import React from 'react';

export default function ExerciseCard({ exercise }) {
  return (
    <div className="dash-card exercise-card">
      <div className="exercise-card-header">
        <h3 className="exercise-card-title">{exercise.title}</h3>
        <span className="exercise-card-badge">{exercise.intensity} Intensity</span>
      </div>
      
      {/* Conditionally render the YouTube link if one exists in the data */}
      {exercise.ytLink && (
        <a href={exercise.ytLink} target="_blank" rel="noopener noreferrer" className="exercise-card-link">
          ▶ Watch Tutorial
        </a>
      )}

      <p className="exercise-card-desc">{exercise.desc}</p>
    </div>
  );
}
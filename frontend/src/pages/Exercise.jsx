import React, { useState } from 'react';
import ExerciseSidebar from '../components/Exercise/ExerciseSidebar';
import ExerciseCard from '../components/Exercise/ExerciseCard';
import ExercisePlanner from '../components/Exercise/ExercisePlanner';
import ExerciseForm from '../components/Exercise/ExerciseForm';
import { initialExerciseData } from '../data/exerciseData';
import '../styles/Exercise.css';

export default function Exercise() {
  // State Management
  const [activeCategory, setActiveCategory] = useState('all');
  const [targetDay, setTargetDay] = useState('Monday');
  const [savedExercises, setSavedExercises] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [customExercises, setCustomExercises] = useState([]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Combine static data with custom user-created exercises
  const allExercises = [...initialExerciseData, ...customExercises];

  // Filter based on active category
  const filteredExercises = activeCategory === 'all' 
    ? allExercises 
    : allExercises.filter(ex => ex.category === activeCategory);

  // The 6-Exercise Limit Logic
  const currentDayCount = savedExercises.filter(ex => ex.day === targetDay).length;
  const isLimitReached = currentDayCount >= 6;

  const handleSaveToDay = (exercise) => {
    if (isLimitReached) return;
    setSavedExercises([...savedExercises, { uniqueId: Date.now(), exercise, day: targetDay }]);
  };

  const handleRemoveExercise = (uniqueId) => {
    setSavedExercises(savedExercises.filter(ex => ex.uniqueId !== uniqueId));
  };

  const handleCreateExercise = (newExercise) => {
    setCustomExercises([...customExercises, newExercise]);
    setShowForm(false);
  };

  return (
    <div className="exercise-wrapper">
      <div className="exercise-layout">
        
        {/* Sidebar Left */}
        <ExerciseSidebar 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          targetDay={targetDay}
          setTargetDay={setTargetDay}
          daysOfWeek={daysOfWeek}
          showForm={showForm}
          onToggleForm={() => setShowForm(!showForm)}
        />

        {/* Main Content Right */}
        <div className="exercise-main">
          
          <div className="exercise-header">
            <p className="dash-eyebrow">Vyayam · Fitness</p>
            <h1 className="dash-title exercise-title">Fitness Guide</h1>
            <p className="dash-sub exercise-sub">
              Discover routines structured for gym training, high-intensity intervals, and age-specific mobility.
            </p>
          </div>

          <div className="exercise-grid">
            {filteredExercises.map(ex => (
              <ExerciseCard 
                key={ex.id} 
                exercise={ex}
                targetDay={targetDay}
                onSaveToDay={handleSaveToDay}
                isLimitReached={isLimitReached}
              />
            ))}
          </div>

          <ExercisePlanner 
            daysOfWeek={daysOfWeek}
            savedExercises={savedExercises}
            onRemoveExercise={handleRemoveExercise}
          />
        </div>

      </div>

      {/* Floating Modal for Custom Exercises */}
      {showForm && (
        <ExerciseForm 
          onSave={handleCreateExercise} 
          onClose={() => setShowForm(false)} 
        />
      )}
    </div>
  );
}
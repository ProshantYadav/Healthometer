import React, { useState, useEffect } from 'react';
import ExerciseSidebar from '../components/Exercise/ExerciseSidebar';
import ExerciseCard from '../components/Exercise/ExerciseCard';
import ExercisePlanner from '../components/Exercise/ExercisePlanner';
import ExerciseForm from '../components/Exercise/ExerciseForm';
import { initialExerciseData } from '../data/exerciseData';
import { fetchExercises, addExercise, deleteExercise, fetchCustomItems, addCustomItem } from '../services/api';
import '../styles/Exercise.css';

export default function Exercise() {
  // State Management
  const [activeCategory, setActiveCategory] = useState('all');
  const [targetDay, setTargetDay] = useState('Monday');
  const [savedExercises, setSavedExercises] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [customExercises, setCustomExercises] = useState([]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Load saved exercises and custom items from backend on mount
  useEffect(() => {
    loadBackendData();
  }, []);

  const loadBackendData = async () => {
    try {
      const exerciseRes = await fetchExercises();
      setSavedExercises(exerciseRes.data);

      const customRes = await fetchCustomItems('exercise');
      if (customRes.data && customRes.data.length > 0) {
        setCustomExercises(customRes.data);
      }
    } catch (err) {
      console.error('Error fetching exercise data from backend:', err);
    }
  };

  // Combine static data with custom user-created exercises
  const allExercises = [...initialExerciseData, ...customExercises];

  // Filter based on active category
  const filteredExercises = activeCategory === 'all' 
    ? allExercises 
    : allExercises.filter(ex => ex.category === activeCategory);

  // The 6-Exercise Limit Logic
  const currentDayCount = savedExercises.filter(ex => ex.day === targetDay).length;
  const isLimitReached = currentDayCount >= 6;

  const handleSaveToDay = async (exercise) => {
    if (isLimitReached) return;
    try {
      const payload = {
        day: targetDay,
        title: exercise.title,
        category: exercise.category,
        intensity: exercise.intensity || 'Medium',
        youtubeLink: exercise.youtubeLink || ''
      };
      const response = await addExercise(payload);
      setSavedExercises([...savedExercises, response.data]);
    } catch (err) {
      console.error('Failed to save exercise:', err.response?.data?.error || err.message);
    }
  };

  const handleRemoveExercise = async (id) => {
    try {
      await deleteExercise(id);
      setSavedExercises(savedExercises.filter(ex => ex._id !== id));
    } catch (err) {
      console.error('Failed to delete exercise:', err);
    }
  };

  const handleCreateExercise = async (newExercise) => {
    try {
      const payload = {
        type: 'exercise',
        title: newExercise.title,
        category: newExercise.category,
        intensity: newExercise.intensity,
        youtubeLink: newExercise.youtubeLink
      };
      const response = await addCustomItem(payload);
      setCustomExercises([...customExercises, response.data]);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create custom exercise:', err);
    }
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
                key={ex._id || ex.id} 
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
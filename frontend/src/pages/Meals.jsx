import React, { useState, useEffect } from 'react';
import MealSidebar from '../components/Meals/MealsSidebar';
import MealForm from '../components/Meals/MealForm';
import MealCard from '../components/Meals/MealCard';
import MealPlanner from '../components/Meals/MealPlanner';
import { daysOfWeek, initialMealsData } from '../data/mealsData';
import { fetchMeals, addMeal, deleteMeal, fetchCustomItems, addCustomItem } from '../services/api';
import '../styles/Meals.css';

export default function Meals() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [targetDay, setTargetDay] = useState('Monday');
  const [savedMeals, setSavedMeals] = useState([]);
  const [customMeals, setCustomMeals] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Load backend data on component mount
  useEffect(() => {
    loadBackendData();
  }, []);

  const loadBackendData = async () => {
    try {
      const mealsRes = await fetchMeals();
      setSavedMeals(mealsRes.data);

      const customRes = await fetchCustomItems('meal');
      if (customRes.data && customRes.data.length > 0) {
        setCustomMeals(customRes.data);
      }
    } catch (err) {
      console.error('Error fetching meals data from backend:', err);
    }
  };

  const allMeals = [...initialMealsData, ...customMeals];

  const filteredMeals = activeCategory === 'all' 
    ? allMeals 
    : allMeals.filter(m => m.category === activeCategory);

  const currentDayMealCount = savedMeals.filter(m => m.day === targetDay).length;
  const isLimitReached = currentDayMealCount >= 10;

  const handleSaveToDay = async (meal) => {
    if (isLimitReached) return; 
    try {
      const payload = {
        day: targetDay,
        title: meal.title,
        category: meal.category,
        calories: meal.calories || 250
      };
      const response = await addMeal(payload);
      setSavedMeals([...savedMeals, response.data]);
    } catch (err) {
      console.error('Failed to save meal:', err.response?.data?.error || err.message);
    }
  };
  
  const handleRemoveMeal = async (id) => {
    try {
      await deleteMeal(id);
      setSavedMeals(savedMeals.filter(m => m._id !== id));
    } catch (err) {
      console.error('Failed to delete meal:', err);
    }
  };

  const handleCreateMeal = async (customMeal) => {
    try {
      const payload = {
        type: 'meal',
        title: customMeal.title,
        category: customMeal.category,
        calories: customMeal.calories
      };
      const response = await addCustomItem(payload);
      setCustomMeals([...customMeals, response.data]);
      setShowForm(false); // Close form on success
    } catch (err) {
      console.error('Failed to create custom meal:', err);
    }
  };

  return (
    <div className="meals-wrapper">
      <div className="meals-layout">
        
        <MealSidebar 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          targetDay={targetDay}
          setTargetDay={setTargetDay}
          daysOfWeek={daysOfWeek}
          showForm={showForm}
          onToggleForm={() => setShowForm(!showForm)}
        />

        <div className="meals-main">
          <div>
            <h1 className="dash-title meals-title">Meal Explorer</h1>
            <p className="dash-sub meals-sub">Add meals directly to your schedule.</p>
          </div>

          <div className="meals-grid">
            {filteredMeals.map(meal => (
              <MealCard 
                key={meal._id || meal.id} 
                meal={meal} 
                targetDay={targetDay} 
                onSaveToDay={handleSaveToDay}
                isLimitReached={isLimitReached} 
              />
            ))}
          </div>

          <MealPlanner 
            daysOfWeek={daysOfWeek} 
            savedMeals={savedMeals} 
            onRemoveMeal={handleRemoveMeal} 
          />
        </div>
      </div>

      {/* The modal sits completely outside the grid layout so it covers the screen */}
      {showForm && (
        <MealForm 
          onSave={handleCreateMeal} 
          onClose={() => setShowForm(false)} 
        />
      )}
    </div>
  );
}
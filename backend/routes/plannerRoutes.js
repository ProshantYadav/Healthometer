const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');
const ExercisePlan = require('../models/ExercisePlan');
const CustomItem = require('../models/CustomItem');

// MEAL PLAN ROUTES 

// Get all meals or filter by day (?day=Monday)
router.get('/meals', async (req, res) => {
  try {
    const { day } = req.query;
    const filter = day ? { day } : {};
    const meals = await MealPlan.find(filter);
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a meal the 6-item daily limit)
router.post('/meals', async (req, res) => {
  try {
    const { day, title, category, calories } = req.body;
    
    // Check current count for the day
    const count = await MealPlan.countDocuments({ day });
    if (count >= 6) {
      return res.status(400).json({ error: 'Daily limit of 6 meals reached for this day.' });
    }

    const newMeal = new MealPlan({ day, title, category, calories });
    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/meals/:id', async (req, res) => {
  try {
    await MealPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  EXERCISE PLAN ROUTES 

// Get all exercises or filter by day
router.get('/exercises', async (req, res) => {
  try {
    const { day } = req.query;
    const filter = day ? { day } : {};
    const exercises = await ExercisePlan.find(filter);
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add an exercise  6-item daily limit)
router.post('/exercises', async (req, res) => {
  try {
    const { day, title, category, intensity, youtubeLink } = req.body;

    const count = await ExercisePlan.countDocuments({ day });
    if (count >= 6) {
      return res.status(400).json({ error: 'Daily limit of 6 exercises reached for this day.' });
    }

    const newExercise = new ExercisePlan({ day, title, category, intensity, youtubeLink });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an exercise by ID
router.delete('/exercises/:id', async (req, res) => {
  try {
    await ExercisePlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CUSTOM ITEM ROUTES 

// Get custom items (optionally filter by type: ?type=meal or ?type=exercise)
router.get('/custom', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const customItems = await CustomItem.find(filter);
    res.json(customItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a custom item
router.post('/custom', async (req, res) => {
  try {
    const { type, title, category, calories, intensity, youtubeLink } = req.body;
    const newItem = new CustomItem({ type, title, category, calories, intensity, youtubeLink });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/custom/:id', async (req, res) => {
  try {
    await CustomItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Custom item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
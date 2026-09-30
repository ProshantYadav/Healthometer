import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// MEAL PLAN API 
export const fetchMeals = (day) => api.get(`/planner/meals${day ? `?day=${day}` : ''}`);
export const addMeal = (mealData) => api.post('/planner/meals', mealData);
export const deleteMeal = (id) => api.delete(`/planner/meals/${id}`);

// EXERCISE PLAN API 
export const fetchExercises = (day) => api.get(`/planner/exercises${day ? `?day=${day}` : ''}`);
export const addExercise = (exerciseData) => api.post('/planner/exercises', exerciseData);
export const deleteExercise = (id) => api.delete(`/planner/exercises/${id}`);

// CUSTOM ITEMS API 
export const fetchCustomItems = (type) => api.get(`/planner/custom${type ? `?type=${type}` : ''}`);
export const addCustomItem = (itemData) => api.post('/planner/custom', itemData);
export const deleteCustomItem = (id) => api.delete(`/planner/custom/${id}`);

// WEIGHT LOG API 
export const fetchWeightLogs = () => api.get('/weight');
export const addWeightLog = (logData) => api.post('/weight', logData);
export const deleteWeightLog = (id) => api.delete(`/weight/${id}`);

export default api;
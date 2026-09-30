const mongoose = require('mongoose');

const exercisePlanSchema = new mongoose.Schema({
  day: { 
    type: String, 
    required: true, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
  },
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  intensity: { type: String, required: true, enum: ['Low', 'Medium', 'High', 'Intense'] },
  youtubeLink: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('ExercisePlan', exercisePlanSchema);
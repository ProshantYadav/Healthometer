const mongoose = require('mongoose');

const customItemSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['meal', 'exercise'] },
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  calories: { type: Number },
  intensity: { type: String },
  youtubeLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('CustomItem', customItemSchema);
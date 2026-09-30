const mongoose = require('mongoose');

const weightLogSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  weight: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('WeightLog', weightLogSchema);
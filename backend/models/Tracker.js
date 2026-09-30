import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, 
  value: { type: Number, required: true },
  note: { type: String, default: '' }
}, { timestamps: true });

// Export two separate collections using the same schema structure
export const WeightLog = mongoose.model('WeightLog', LogSchema);
export const CalorieLog = mongoose.model('CalorieLog', LogSchema);
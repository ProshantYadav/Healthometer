import express from 'express';
import { WeightLog, CalorieLog } from '../models/Tracker.js';

const router = express.Router();

// ─── WEIGHT ENDPOINTS ───
router.get('/weight', async (req, res) => {
  try {
    const entries = await WeightLog.find().sort({ date: 1 });
    res.json({ entries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weight logs' });
  }
});

router.post('/weight', async (req, res) => {
  try {
    const { date, value, note } = req.body;
    const entry = await WeightLog.findOneAndUpdate(
      { date }, 
      { date, value: parseFloat(value), note }, 
      { new: true, upsert: true }
    );
    res.status(201).json({ entry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save weight' });
  }
});

// ─── CALORIE ENDPOINTS ───
router.get('/calorie', async (req, res) => {
  try {
    const entries = await CalorieLog.find().sort({ date: 1 });
    res.json({ entries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch calorie logs' });
  }
});

router.post('/calorie', async (req, res) => {
  try {
    const { date, value, note } = req.body;
    const entry = await CalorieLog.findOneAndUpdate(
      { date }, 
      { date, value: parseInt(value), note }, 
      { new: true, upsert: true }
    );
    res.status(201).json({ entry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save calories' });
  }
});

// ─── DELETE ENDPOINTS ───
router.delete('/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const Model = type === 'weight' ? WeightLog : CalorieLog;
    await Model.findByIdAndDelete(id);
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

export default router;
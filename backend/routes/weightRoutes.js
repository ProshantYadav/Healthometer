const express = require('express');
const router = express.Router();
const WeightLog = require('../models/WeightLog');

// Get all weight logs sorted by date (oldest to newest for graphs)
router.get('/', async (req, res) => {
  try {
    const logs = await WeightLog.find().sort({ date: 1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new weight entry
router.post('/', async (req, res) => {
  try {
    const { weight, date } = req.body;
    const newLog = new WeightLog({
      weight,
      date: date ? new Date(date) : Date.now()
    });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await WeightLog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Weight log deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
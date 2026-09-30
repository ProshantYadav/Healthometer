const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const plannerRoutes = require('./routes/plannerRoutes');
const weightRoutes = require('./routes/weightRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/planner', plannerRoutes);
app.use('/api/weight', weightRoutes);

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.get('/', (req, res) => {
  res.send('Health-o-meter API is active (Single User Mode)');
});

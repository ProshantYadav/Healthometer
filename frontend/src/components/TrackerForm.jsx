import React, { useState } from 'react';

export default function TrackerForm({ onSave }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [note, setNote] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight && !calories) return;
    
    try {
      // Attempt to save to backend
      const response = await fetch('http://localhost:5000/api/tracker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, weight, calories, note })
      });

      if (response.ok) {
        console.log("Saved to database!");
      }
    } catch (error) {
      console.warn("Backend offline. Saving to local React state only.");
    }

    // Always update the UI and clear the form
    onSave({ date, weight, calories, note });
    setWeight('');
    setCalories('');
    setNote('');
  };

  return (
    <div className="dash-text tracker-left">
      <p className="dash-eyebrow">Daily Metrics</p>
      <h1 className="dash-title">Tracker</h1>
      <p className="dash-sub">
        Log your daily weight and caloric intake. Entering new data for an existing date will automatically update your records.
      </p>

      <form onSubmit={handleSubmit} className="tracker-form">
        <div className="calc-field tracker-field">
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        <div className="calc-field tracker-field">
          <label>Weight (kg)</label>
          <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 75.5" />
        </div>

        <div className="calc-field tracker-field">
          <label>Total Calories (kcal)</label>
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="e.g. 2100" />
        </div>

        <div className="calc-field tracker-field-last">
          <label>Daily Note (Optional)</label>
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Heavy lifting day" />
        </div>

        <button type="submit" className="calc-btn tracker-submit">
          Save Metrics
        </button>
      </form>
    </div>
  );
}
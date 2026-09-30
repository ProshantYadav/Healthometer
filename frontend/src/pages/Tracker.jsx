import React, { useState, useEffect } from 'react';
import TrackerForm from '../components/TrackerForm';
import TrackerHistory from '../components/TrackerHistory';
import '../styles/tracker.css'; 

export default function Tracker() {
  const [logs, setLogs] = useState([]);

  // Fetch data on load (fails gracefully if backend isn't running)
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tracker');
        if (response.ok) {
          const data = await response.json();
          setLogs(data);
        }
      } catch (error) {
        console.warn("Backend not connected yet. Falling back to local state.");
      }
    };
    fetchLogs();
  }, []);

  // Simulates your backend upsert behavior in the UI
  const handleSaveData = (newData) => {
    setLogs(prevLogs => {
      const existingIndex = prevLogs.findIndex(log => log.date === newData.date);
      
      if (existingIndex >= 0) {
        const updatedLogs = [...prevLogs];
        updatedLogs[existingIndex] = {
          ...updatedLogs[existingIndex],
          weight: newData.weight || updatedLogs[existingIndex].weight,
          calories: newData.calories || updatedLogs[existingIndex].calories,
          note: newData.note || updatedLogs[existingIndex].note
        };
        return updatedLogs;
      } else {
        return [...prevLogs, newData].sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    });
  };

  return (
    <div className="dash-wrapper tracker-wrapper">
      <div className="dash-grid tracker-grid">
        <TrackerForm onSave={handleSaveData} />
        <TrackerHistory logs={logs} />
      </div>
    </div>
  );
}
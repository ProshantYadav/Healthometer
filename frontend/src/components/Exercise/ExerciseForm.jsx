import React, { useState } from 'react';

export default function ExerciseForm({ onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('gym');
  const [intensity, setIntensity] = useState('Moderate');
  const [ytLink, setYtLink] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    
    onSave({
      id: Date.now(),
      title,
      category,
      intensity,
      ytLink,
      desc: desc || 'Custom user-created workout routine.'
    });

    setTitle('');
    setCategory('gym');
    setIntensity('Moderate');
    setYtLink('');
    setDesc('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <form onSubmit={handleSubmit} className="popup-form">
          <h3 className="form-title">Create Custom Exercise</h3>
          <div className="form-grid">
            
            <div className="calc-field">
              <label>Exercise Name</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            
            <div className="calc-field">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="gym">Gym</option>
                <option value="hiit">HIIT</option>
                <option value="home">Home</option>
                <option value="age">By Age Group</option>
              </select>
            </div>
            
            <div className="calc-field">
              <label>Intensity</label>
              <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
              </select>
            </div>
            
            <div className="calc-field">
              <label>YouTube Link</label>
              <input type="url" value={ytLink} onChange={(e) => setYtLink(e.target.value)} placeholder="https://youtube.com/..." />
            </div>
            
            <div className="calc-field" style={{ gridColumn: '1 / -1' }}>
              <label>Description</label>
              <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
            
          </div>
          <button type="submit" className="calc-btn form-submit">Save Exercise</button>
        </form>
      </div>
    </div>
  );
}
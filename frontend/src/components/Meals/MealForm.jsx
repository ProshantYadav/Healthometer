import React, { useState } from 'react';

export default function MealForm({ onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('keto');
  const [calories, setCalories] = useState('');
  const [ytLink, setYtLink] = useState(''); // New state
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !calories) return;
    
    onSave({
      id: Date.now(),
      title,
      category,
      calories: `${calories} kcal`,
      ytLink, // Add to saved object
      desc: desc || 'Custom user-created meal configuration.'
    });

    setTitle('');
    setCalories('');
    setYtLink('');
    setDesc('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <form onSubmit={handleSubmit} className="recipe-form popup-form">
          <h3 className="form-title">Create New Recipe</h3>
          <div className="form-grid">
            <div className="calc-field">
              <label>Meal Name</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="calc-field">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="keto">Keto</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="regional">Regional</option>
              </select>
            </div>
            <div className="calc-field">
              <label>Calories (kcal)</label>
              <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
            </div>
            <div className="calc-field">
              <label>YouTube Link</label>
              <input type="url" value={ytLink} onChange={(e) => setYtLink(e.target.value)} placeholder="https://youtube.com/..." />
            </div>
            {/* Added a custom inline style to make the description span both columns */}
            <div className="calc-field" style={{ gridColumn: '1 / -1' }}>
              <label>Description</label>
              <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="calc-btn form-submit">Save Recipe</button>
        </form>
      </div>
    </div>
  );
}
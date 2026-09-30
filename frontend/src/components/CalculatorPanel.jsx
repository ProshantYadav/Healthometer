import React, { useState } from 'react';
import '../styles/CalculatorPanel.css'

export default function CalculatorPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('bmi');

  // BMI State
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  // BMR State
  const [bmrAge, setBmrAge] = useState('');
  const [bmrGender, setBmrGender] = useState('male');
  const [bmrWeight, setBmrWeight] = useState('');
  const [bmrHeight, setBmrHeight] = useState('');
  const [bmrActivity, setBmrActivity] = useState('1.2');
  const [bmrResult, setBmrResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight) / 100; 
    if (!w || !h) return;
    
    const bmi = (w / (h * h)).toFixed(1);
    let tagClass = 'tag-normal';
    let tagText = 'Normal Weight';
    
    if (bmi < 18.5) { tagClass = 'tag-under'; tagText = 'Underweight'; }
    else if (bmi >= 25 && bmi < 30) { tagClass = 'tag-over'; tagText = 'Overweight'; }
    else if (bmi >= 30) { tagClass = 'tag-obese'; tagText = 'Obese'; }

    setBmiResult({ value: bmi, tagClass, tagText });
  };

  const calculateBMR = (e) => {
    e.preventDefault();
    const age = parseInt(bmrAge);
    const w = parseFloat(bmrWeight);
    const h = parseFloat(bmrHeight);
    if (!age || !w || !h) return;

    // Mifflin-St Jeor Equation
    let bmr = (10 * w) + (6.25 * h) - (5 * age);
    bmr = bmrGender === 'male' ? bmr + 5 : bmr - 161;
    const tdee = Math.round(bmr * parseFloat(bmrActivity));

    setBmrResult({ bmr: Math.round(bmr), tdee });
  };

  return (
    <>
      {/* Background Dark Overlay */}
      <div className={`calc-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>

      {/* Slide-out Panel */}
      <div className={`calc-panel ${isOpen ? 'open' : ''}`}>
        <div className="calc-header">
          <h2>Health Calculators</h2>
          <button className="calc-close" onClick={onClose}>&times;</button>
        </div>

        <div className="calc-tabs">
          <button 
            className={`calc-tab ${activeTab === 'bmi' ? 'active' : ''}`} 
            onClick={() => setActiveTab('bmi')}
          >
            BMI Calculator
          </button>
          <button 
            className={`calc-tab ${activeTab === 'bmr' ? 'active' : ''}`} 
            onClick={() => setActiveTab('bmr')}
          >
            BMR & TDEE
          </button>
        </div>

        <div className="calc-body">
          {/* BMI Pane */}
          <div className={`calc-pane ${activeTab === 'bmi' ? 'active' : ''}`}>
            <form onSubmit={calculateBMI}>
              <div className="calc-field">
                <label>Weight (kg)</label>
                <input type="number" step="0.1" value={bmiWeight} onChange={(e) => setBmiWeight(e.target.value)} placeholder="e.g. 70" required />
              </div>
              <div className="calc-field">
                <label>Height (cm)</label>
                <input type="number" step="0.1" value={bmiHeight} onChange={(e) => setBmiHeight(e.target.value)} placeholder="e.g. 175" required />
              </div>
              <button type="submit" className="calc-btn">Calculate BMI</button>
            </form>

            {bmiResult && (
              <div className="calc-result show">
                <div className="result-big">
                  <span className="val">{bmiResult.value}</span>
                  <span className="unit">BMI Score</span>
                  <span className={`result-tag ${bmiResult.tagClass}`}>{bmiResult.tagText}</span>
                </div>
              </div>
            )}
          </div>

          {/* BMR Pane */}
          <div className={`calc-pane ${activeTab === 'bmr' ? 'active' : ''}`}>
            <form onSubmit={calculateBMR}>
              <div className="calc-field">
                <label>Age (years)</label>
                <input type="number" value={bmrAge} onChange={(e) => setBmrAge(e.target.value)} placeholder="e.g. 21" required />
              </div>
              <div className="calc-field">
                <label>Gender</label>
                <select value={bmrGender} onChange={(e) => setBmrGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="calc-field">
                <label>Weight (kg)</label>
                <input type="number" step="0.1" value={bmrWeight} onChange={(e) => setBmrWeight(e.target.value)} placeholder="e.g. 70" required />
              </div>
              <div className="calc-field">
                <label>Height (cm)</label>
                <input type="number" step="0.1" value={bmrHeight} onChange={(e) => setBmrHeight(e.target.value)} placeholder="e.g. 175" required />
              </div>
              <div className="calc-field">
                <label>Activity Level</label>
                <select value={bmrActivity} onChange={(e) => setBmrActivity(e.target.value)}>
                  <option value="1.2">Sedentary (little/no exercise)</option>
                  <option value="1.375">Lightly active (1-3 days/wk)</option>
                  <option value="1.55">Moderately active (3-5 days/wk)</option>
                  <option value="1.725">Very active (6-7 days/wk)</option>
                </select>
              </div>
              <button type="submit" className="calc-btn">Calculate BMR</button>
            </form>

            {bmrResult && (
              <div className="calc-result show">
                <div className="result-row">
                  <span className="result-label">Basal Metabolic Rate</span>
                  <span className="result-value" style={{ color: 'var(--turmeric)' }}>{bmrResult.bmr} kcal/day</span>
                </div>
                <div className="result-row" style={{ marginTop: '0.5rem' }}>
                  <span className="result-label">Total Daily Energy (TDEE)</span>
                  <span className="result-value" style={{ color: 'var(--saffron)', fontWeight: 'bold' }}>{bmrResult.tdee} kcal/day</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
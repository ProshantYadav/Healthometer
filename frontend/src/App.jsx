import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/base.css';
import './styles/layout.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import Meals from './pages/Meals';
import Exercise from './pages/Exercise';
import CalculatorPanel from './components/CalculatorPanel';

export default function App() {
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar onOpenCalc={() => setIsCalcOpen(true)} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/exercise" element={<Exercise />} />
      </Routes>

      <CalculatorPanel isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
    </BrowserRouter>
  );
}
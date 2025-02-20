// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Presupuesto from './components/Presupuesto';
import Resumen from './components/Resumen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Presupuesto />} />
        <Route path="/resumen" element={<Resumen />} />
      </Routes>
    </Router>
  );
}

export default App;

// src/App.tsx
import React from 'react';
import './App.css';
import SalaryTable from './components/SalaryTable';
import SalaryLineChart from './components/SalaryLineChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ML Engineer Salaries</h1>
      </header>
      <main>
        <SalaryTable />
        <h2>Job Trends (2020 - 2024)</h2>
        <SalaryLineChart />
      </main>
    </div>
  );
}

export default App;

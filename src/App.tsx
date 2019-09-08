import React from 'react';
import './App.css';
import Header from './components/headers/headers';
import LineChart from './components/d3/line-chart';

const App: React.FC = () => {
  return (
    <div className="App">
        <Header/>
        <LineChart/>
    </div>
  );
};

export default App;

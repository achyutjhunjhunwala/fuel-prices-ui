import React from 'react';
import './App.css';
import FuelPriceTable from './components/table';
import Header from './components/headers/headers';
import Chart from './components/d3/chart';
import LineChartMouseOverXY from './components/d3/tooltip';
import LineChart from './components/d3/test';

const App: React.FC = () => {
  return (
    <div className="App">
        <Header/>
        <FuelPriceTable/>
        <Chart/>
        <LineChartMouseOverXY/>
        <LineChart/>
    </div>
  );
};

export default App;

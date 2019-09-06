import React from 'react';
import './App.css';
import FuelPriceTable from './components/table';
import Header from './components/headers/headers';

const App: React.FC = () => {
  return (
    <div className="App">
        <Header/>
        <FuelPriceTable/>
    </div>
  );
};

export default App;

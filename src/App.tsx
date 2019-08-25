import React from 'react';
import './App.css';
import InstrumentSelector from './components/instrument-selector/InstrumentSelector';

const App: React.FC = () => {
  return (
    <div className="App">
      <InstrumentSelector></InstrumentSelector>
    </div>
  );
}

export default App;

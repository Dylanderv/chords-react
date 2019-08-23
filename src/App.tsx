import React from 'react';
import './App.css';
import ChordViewer from './components/chords-viewer/ChordViewer';
import InstrumentSelector from './components/instrument-selector/InstrumentSelector';

const App: React.FC = () => {
  return (
    <div className="App">
      <InstrumentSelector instrument="instrumentList"></InstrumentSelector>
    </div>
  );
}

export default App;

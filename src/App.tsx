import React from 'react';
import './App.css';
import ChordViewer from './components/chords-viewer/ChordViewer';

const App: React.FC = () => {
  return (
    <div className="App">
      <ChordViewer instrument="instrumentList"></ChordViewer>
    </div>
  );
}

export default App;

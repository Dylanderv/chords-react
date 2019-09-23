import React from 'react';
import './App.css';
import './index.scss';
import InstrumentSelector from './components/instrument-selector/InstrumentSelector';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
// import MainChordSelector from './components/chords-viewer/MainChordSelector';
// import SecondChordSelector from './components/chords-viewer/SecondChordSelector';
// import ChordViewer from './components/chords-viewer/ChordViewer';
import { CHORD_VIEWER_BASE_ROUTE } from './utils/routerUtils';
import ChordViewer from './components/chords-viewer/ChordViewer';
import { Header, HeaderName, SkipToContent } from 'carbon-components-react';

const App: React.FC = () => {
  return (
    <Router>
      <Header aria-label="Chords-react">
        <SkipToContent></SkipToContent>
        <HeaderName href="#" prefix="">
          Chords-react
        </HeaderName>
      </Header>
      <Link to={CHORD_VIEWER_BASE_ROUTE}>Chord Viewer</Link>

      <Route path={CHORD_VIEWER_BASE_ROUTE} component={InstrumentSelector}/>
      <Route path={CHORD_VIEWER_BASE_ROUTE + "/:instrument/:mainChord/:secondChord"} component={ChordViewer} />
    </Router>
  );
}

export default App;

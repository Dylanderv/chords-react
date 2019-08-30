import React from 'react';
import useChordService from '../../hooks/useChordService';
import { InstrumentType } from '../../model/InstrumentType';
import { getDisplayDataFromInstrumentSelector } from '../../utils/chordViewerUtils';
import { RouteComponentProps } from 'react-router';

type TParams = {instrument: InstrumentType|'instrumentList', mainChord: string, secondChord: string}

function ChordViewer ({ match }: RouteComponentProps<TParams>) {
  const service = useChordService(match.params.instrument);

  // let dataToDisplay = [""];
  // if (service.status === "loaded") {
  //   // Récupérer les données à afficher dans le selector
  //   dataToDisplay = getDisplayDataFromInstrumentSelector(service.payload);
  // }

  return (
      <div>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
        <div>
          {match.params.instrument}
          {match.params.mainChord}
          {match.params.secondChord}
        </div>
        )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default ChordViewer;
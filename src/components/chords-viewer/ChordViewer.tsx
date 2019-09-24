import React from 'react';
import useChordService from '../../hooks/useChordService';
import { InstrumentType } from '../../model/InstrumentType';
import { RouteComponentProps, StaticContext } from 'react-router';
import { useReactRouter } from '../../hooks/useReactRouter';

type TParams = {instrument: InstrumentType|'instrumentList', mainChord: string, suffix: string}

const ChordViewer = () => {
  const router = useReactRouter() as RouteComponentProps<TParams, StaticContext, any>;
  const service = useChordService(router.match.params.instrument);
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
          {router.match.params.instrument}
          {router.match.params.mainChord}
          {router.match.params.suffix}
        </div>
        )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default ChordViewer;
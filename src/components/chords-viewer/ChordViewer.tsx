import React from 'react';
import useChordService from '../../hooks/useChordService';
import { InstrumentType } from '../../model/InstrumentType';
import { RouteComponentProps, StaticContext } from 'react-router';
import { useReactRouter } from '../../hooks/useReactRouter';
import { renderPianoSvg } from '../../utils/pianoChordViewer';
import { IPianoChords, PianoKeys } from '../../model/piano/IPianoChords';
import { IPianoChord } from '../../model/piano/IPianoChord';

type TParams = {instrument: InstrumentType|'instrumentList', mainChord: PianoKeys, suffix: string}

const ChordViewer = () => {
  const router = useReactRouter() as RouteComponentProps<TParams, StaticContext, any>;
  const service = useChordService(router.match.params.instrument);

  let svg = '';
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
    if (router.match.params.instrument === 'piano') {
      let pianoChord = 
        (service.payload.data as IPianoChords)
          .chords[router.match.params.mainChord]
          .find((chord: IPianoChord) => chord.suffix === router.match.params.suffix);
      if (pianoChord !== undefined) {
        svg = renderPianoSvg(pianoChord);
      }
    }
  }

  return (
      <div>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
        <div>
          {router.match.params.instrument === 'piano' && svg !== '' ? <svg dangerouslySetInnerHTML={{__html:svg}}></svg> : <div></div>}
          
        </div>
        )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default ChordViewer;
import React from 'react';
import useChordService from '../../hooks/useChordService';
import { InstrumentType } from '../../model/InstrumentType';
import { RouteComponentProps, StaticContext } from 'react-router';
import { useReactRouter } from '../../hooks/useReactRouter';
import { renderPianoSvg, getGuitarUkuleleSvg } from '../../utils/chordViewerUtils';
import { IPianoChords, PianoKeys } from '../../model/piano/IPianoChords';
import { IPianoChord } from '../../model/piano/IPianoChord';
import { IGuitarChords } from '../../model/guitar/IGuitarChords';
import { IUkuleleChords } from '../../model/ukulele/IUkuleleChords';

type TParams = {instrument: InstrumentType, mainChord: string, suffix: string}

export const SVG_SIZE: {width: number, height: number} = { width: 250, height: 400 }

const ChordViewer: React.FC<TParams> = ( { instrument, mainChord, suffix } ) => {
  const router = useReactRouter() as RouteComponentProps<TParams, StaticContext, any>;
  const service = useChordService(instrument);

  let svg = '';
  let svgGuitar;
  let svgUkulele;
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
    if (instrument === 'piano' && (service.payload.data as IPianoChords)!.main!.name! === 'piano') {
      let pianoChords = (service.payload.data as IPianoChords).chords
      if (pianoChords && pianoChords !== undefined && pianoChords !== null && pianoChords[mainChord]) {
        let pianoChord = pianoChords[mainChord].find((chord: IPianoChord) => chord.suffix === suffix);
        if (pianoChord !== undefined) {
          svg = renderPianoSvg(pianoChord);
        }
      }
    } else if(instrument === 'guitar' && (service.payload.data as IGuitarChords)!.main!.name! === 'guitar') {
      svgGuitar = getGuitarUkuleleSvg(instrument, service.payload.data as IGuitarChords|IUkuleleChords, mainChord, suffix);
    } else if (instrument === 'ukulele' && (service.payload.data as IGuitarChords)!.main!.name! === 'ukulele') {
      svgUkulele = getGuitarUkuleleSvg(instrument, service.payload.data as IGuitarChords|IUkuleleChords, mainChord, suffix);
    }
  }

  return (
      <div>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
        <div>
          {instrument === 'piano' && svg !== '' ? 
            <svg width="90vw" dangerouslySetInnerHTML={{__html: svg}}></svg> : <div></div>
          }
          {(instrument === 'guitar') && svgGuitar !== undefined ? 
            <svg width={SVG_SIZE.width} height={SVG_SIZE.height} dangerouslySetInnerHTML={{__html: svgGuitar.outerHTML}}></svg> : <div></div>
          }
          {(instrument === 'ukulele') && svgUkulele !== undefined ? 
            <svg width={SVG_SIZE.width} height={SVG_SIZE.height} dangerouslySetInnerHTML={{__html: svgUkulele.outerHTML}}></svg> : <div></div>
          }
        </div>
        )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default ChordViewer;
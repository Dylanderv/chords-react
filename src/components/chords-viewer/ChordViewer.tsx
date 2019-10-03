import React from 'react';
import useChordService from '../../hooks/useChordService';
import { renderPianoSvg, getGuitarUkuleleSvg } from '../../utils/chordViewerUtils';
import { IPianoChords } from '../../model/piano/IPianoChords';
import { IPianoChord } from '../../model/piano/IPianoChord';
import { IGuitarChords } from '../../model/guitar/IGuitarChords';
import { IUkuleleChords } from '../../model/ukulele/IUkuleleChords';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

type TParams = {instrumentId: string, key: string, suffix: string}

export const SVG_SIZE: {width: number, height: number} = { width: 250, height: 400 }

function chordQueryBuilder(instrumentId: string, key: string, suffix: string) {
  return gql`
  {
    chordFromName(instrumentId: "${instrumentId}", key: "${key}",suffix: "${suffix}") {
      id
      key
      suffix
      position
      info
    }
  }
  `
}

const ChordViewer: React.FC<TParams> = ( { instrumentId, key, suffix } ) => {
  console.log(instrumentId, key, suffix);
  const { error, data, loading } = useQuery(chordQueryBuilder(instrumentId, key, suffix));
  const service = useChordService('ukulele')//instrumentId);

  let svg = '';
  let svgGuitar;
  let svgUkulele;
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
    if (instrumentId === 'piano' && (service.payload.data as IPianoChords)!.main!.name! === 'piano') {
      let pianoChords = (service.payload.data as IPianoChords).chords
      if (pianoChords && pianoChords !== undefined && pianoChords !== null && pianoChords[key]) {
        let pianoChord = pianoChords[key].find((chord: IPianoChord) => chord.suffix === suffix);
        if (pianoChord !== undefined) {
          svg = renderPianoSvg(pianoChord);
        }
      }
    } else if(instrumentId === 'guitar' && (service.payload.data as IGuitarChords)!.main!.name! === 'guitar') {
      svgGuitar = getGuitarUkuleleSvg(instrumentId, service.payload.data as IGuitarChords|IUkuleleChords, key, suffix);
    } else if (instrumentId === 'ukulele' && (service.payload.data as IGuitarChords)!.main!.name! === 'ukulele') {
      svgUkulele = getGuitarUkuleleSvg(instrumentId, service.payload.data as IGuitarChords|IUkuleleChords, key, suffix);
    }
  }

  if (loading === false && error === undefined) {
    console.log(data);
  }

  return (
      <div>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
        <div>
          {instrumentId === 'piano' && svg !== '' ? 
            <svg width="90vw" dangerouslySetInnerHTML={{__html: svg}}></svg> : <div></div>
          }
          {(instrumentId === 'guitar') && svgGuitar !== undefined ? 
            <svg width={SVG_SIZE.width} height={SVG_SIZE.height} dangerouslySetInnerHTML={{__html: svgGuitar.outerHTML}}></svg> : <div></div>
          }
          {(instrumentId === 'ukulele') && svgUkulele !== undefined ? 
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
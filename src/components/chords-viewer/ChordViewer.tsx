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

type TParams = {instrument: InstrumentType, mainChord: PianoKeys, suffix: string}

export const SVG_SIZE: {width: number, height: number} = { width: 300, height: 450 }

const ChordViewer = () => {
  const router = useReactRouter() as RouteComponentProps<TParams, StaticContext, any>;
  const service = useChordService(router.match.params.instrument);

  let svg = '';
  let svgGuitar;
  let svgUkulele;
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
    if (router.match.params.instrument === 'piano' && (service.payload.data as IPianoChords)!.main!.name! === 'piano') {
      let pianoChord = 
        (service.payload.data as IPianoChords)
          .chords[router.match.params.mainChord]
          .find((chord: IPianoChord) => chord.suffix === router.match.params.suffix);
      if (pianoChord !== undefined) {
        svg = renderPianoSvg(pianoChord);
      }
    } else if(router.match.params.instrument === 'guitar' && (service.payload.data as IGuitarChords)!.main!.name! === 'guitar') {
      svgGuitar = getGuitarUkuleleSvg(router.match.params.instrument, service.payload.data as IGuitarChords|IUkuleleChords, router.match.params.mainChord, router.match.params.suffix);
    } else if (router.match.params.instrument === 'ukulele' && (service.payload.data as IGuitarChords)!.main!.name! === 'ukulele') {
      svgUkulele = getGuitarUkuleleSvg(router.match.params.instrument, service.payload.data as IGuitarChords|IUkuleleChords, router.match.params.mainChord, router.match.params.suffix);
    }
  }

  return (
      <div>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
        <div>
          {router.match.params.instrument === 'piano' && svg !== '' ? 
            <svg width={SVG_SIZE.width} dangerouslySetInnerHTML={{__html: svg}}></svg> : <div></div>
          }
          {(router.match.params.instrument === 'guitar') && svgGuitar !== undefined ? 
            <svg width={SVG_SIZE.width} height={SVG_SIZE.height} dangerouslySetInnerHTML={{__html: svgGuitar.outerHTML}}></svg> : <div></div>
          }
          {(router.match.params.instrument === 'ukulele') && svgUkulele !== undefined ? 
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
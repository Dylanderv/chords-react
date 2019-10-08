import React from 'react';
import useChordService from '../../hooks/useChordService';
import { renderPianoSvg, getGuitarUkuleleSvg } from '../../utils/chordViewerUtils';
import { IPianoChords } from '../../model/piano/IPianoChords';
import { IPianoChord } from '../../model/piano/IPianoChord';
import { IGuitarChords } from '../../model/guitar/IGuitarChords';
import { IUkuleleChords } from '../../model/ukulele/IUkuleleChords';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { TParams } from '../selector/ChordSelector';
import { useTheme } from '@material-ui/core';

type chordViewerProp = {instrumentId: string, instrumentName: string, mainKey: string, suffix: string}

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

const ChordViewer: React.FC<chordViewerProp> = ( { instrumentId, instrumentName, mainKey, suffix } ) => {
  const theme = useTheme();
  const { error, data, loading } = useQuery(chordQueryBuilder(instrumentId, mainKey, suffix));

  let svg = '';
  let svgGuitar;
  let svgUkulele;
  if (loading === false && error === undefined && data.chordFromName) {
    // Récupérer les données à afficher dans le selector
    console.log(data);
    console.log(instrumentName)
    let chord = {
      id: data.chordFromName.id,
      info: data.chordFromName.info,
      key: data.chordFromName.key,
      position: JSON.parse(data.chordFromName.position),
      suffix: data.chordFromName.suffix
    }
    if (instrumentName === 'piano') {
      svg = renderPianoSvg(chord, theme.palette.type);
    } else if(instrumentName === 'guitar') {
      svgGuitar = getGuitarUkuleleSvg(chord, instrumentName, theme.palette.type);
    } else if (instrumentName === 'ukulele') {
      svgUkulele = getGuitarUkuleleSvg(chord, instrumentName, theme.palette.type);
    }
  }

  return (
      <div>
        {loading === true && <div>Loading...</div>}
        {loading === false && error === undefined && (
        <div>
          {instrumentName === 'piano' && svg !== '' ? 
            <svg width={SVG_SIZE.height} dangerouslySetInnerHTML={{__html: svg}}></svg> : <div></div>
          }
          {(instrumentName === 'guitar') && svgGuitar !== undefined ? 
            <svg width={SVG_SIZE.width} height={SVG_SIZE.height} dangerouslySetInnerHTML={{__html: svgGuitar.outerHTML}}></svg> : <div></div>
          }
          {(instrumentName === 'ukulele') && svgUkulele !== undefined ? 
            <svg width={SVG_SIZE.width} height={SVG_SIZE.height} dangerouslySetInnerHTML={{__html: svgUkulele.outerHTML}}></svg> : <div></div>
          }
        </div>
        )}
        {error !== undefined && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default ChordViewer;
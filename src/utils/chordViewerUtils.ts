import PianoSVG from '../svg/PianoKeyboard';
import { IPianoChord, blackKeys } from '../model/piano/IPianoChord';
import { SVG_SIZE } from '../components/chords-viewer/ChordViewer';
import { InstrumentType } from '../model/InstrumentType';
import { IGuitarChords } from '../model/guitar/IGuitarChords';
import { IUkuleleChords } from '../model/ukulele/IUkuleleChords';
import { IChordDBChords } from '../model/IChordDBChords';
import { ChordBox } from 'vexchords'

const Serializer = new XMLSerializer();

// Nécessaire pour traduire les accords du json aux noms utilisés dans le json
const blackListBlackKeys: blackKeys[] = ["Db", "Eb", "Gb", "Ab", "Bb"]
const corBlackKeysEn: {[key in blackKeys]: blackKeys} = {
  "Csharp": "Db", 
  "Db": "Csharp",
  "Dsharp": "Eb", 
  "Eb": "Dsharp",
  "Fsharp": "Gb", 
  "Gb": "Fsharp",
  "Gsharp": "Ab", 
  "Ab": "Gsharp",
  "Asharp": "Bb", 
  "Bb": "Asharp",
};

type svgKey = "C"|"D"|"E"|"F"|"G"|"A"|"B"|"Csharp"|"Dsharp"|"Fsharp"|"Gsharp"|"Asharp";

// Ordre des notes nécessaire pour la selection de l'octave
const keyOrder: {[key in svgKey]: number} = {
  C: 1,
  "Csharp": 2,
  D: 3,
  "Dsharp": 4,
  E: 5,
  F: 6,
  "Fsharp": 7,
  G: 8,
  "Gsharp": 9,
  A: 10,
  "Asharp": 11,
  B: 12
}

/**
 * Permet de retourner un SVG affichant l'accord `chord`
 * @param chord chord à afficher
 */
export function renderPianoSvg(chord: IPianoChord) {
  const piano = new DOMParser().parseFromString(PianoSVG, 'text/xml');
  // Initialisation pour la première touche
  let firstKey = chord.position[0].name;
  // Si le nom de l'accord ne correspond pas au nom dans le svg on le traduit
  if (blackListBlackKeys.includes(firstKey as blackKeys)) {
    firstKey = corBlackKeysEn[firstKey as blackKeys];
  }
  // Selection de la touche (la première touche est forcément sur le premier octave)
  let keyToSelect = "octave-1-" + firstKey + "-key";
  if (piano !== null && piano.getElementById(keyToSelect) !== null) {
    piano.getElementById(keyToSelect)!.setAttribute("fill", "#ff0000");
  }
  // Variable permettant de gérer les octaves
  let isOctave2 = false;
  // Pour toutes les autres touches
  for (let i = 1; i < chord.position.length; i ++) {
    let currentKey = chord.position[i].name;
    // Traduction de la note de la touche
    if (blackListBlackKeys.includes(currentKey as blackKeys)) {
      currentKey = corBlackKeysEn[currentKey as blackKeys];
    }
    // Si on était sur le premier octave et que la prochaine touche doit être sur le prochain octave
    if (!isOctave2 && keyOrder[firstKey as svgKey] > keyOrder[currentKey as svgKey]) {
      // On met à jour la variable d'octave
      isOctave2 = true;
    }
    
    keyToSelect = isOctave2 ? "octave-2-" : "octave-1-"
    keyToSelect += currentKey + "-key";
    // Selection et mise à jour de la couleur de la touche
    if (piano !== null && piano.getElementById(keyToSelect) !== null) {
      piano.getElementById(keyToSelect)!.setAttribute("fill", "#ff0000");
    }
  }
  // On retourne le svg sur notre element
  return Serializer.serializeToString(piano);
}

export function getGuitarUkuleleSvg(instrument: InstrumentType, chordsData: IGuitarChords|IUkuleleChords, routerMainChord: string, routerSuffix: string) {
  if (chordsData.chords && chordsData.chords !== undefined && chordsData.chords !== null && chordsData.chords[routerMainChord]) {
    let chord: IChordDBChords = chordsData
      .chords[routerMainChord]!
      .find((chord: IChordDBChords) => chord.suffix === routerSuffix);
    let data;
    let selector = document.createElement('svg');
    if (chord !== undefined && chord.positions && chord.positions.length > 0) {
      data = {
        name: chord.key,
        chords: chord.positions[0].frets.map((fret, index) => fret === -1 ? [index+1, 'x'] : [index+1, fret]),
        finger: chord.positions[0].fingers,
        baseFret: chord.positions[0].baseFret,
        barres: chord.positions[0].barres!.map(barre => barreInterpretor(chord.positions[0].frets, barre, chordsData.main.numberOfChords))
      }
      const test = new ChordBox(selector, {
        numStrings: instrument === 'guitar' ? 6 : 4,
        width: SVG_SIZE.width,
        height: SVG_SIZE.height
      });
      test.draw({
        chord: data.chords,
        position: data.baseFret,
        barres: data.barres,
        tuning: chordsData.tunings.standard
      })
    }
    return selector;
  }
}

function barreInterpretor(frets: number[], barre: number, chordsNumber: number) {
  let minFret = chordsNumber;
  let maxFret = 0;

  frets.forEach((fret,index) => {
    if (fret === barre) {
      if (index + 1 < minFret) {
        minFret = index + 1
      }
      if (index + 1 > maxFret) {
        maxFret = index + 1
      }
    }
  })
  return {fromString: maxFret, toString: minFret, fret: barre}
}

/*

On part du principe que :
Quand on a un barré sur une case :
 - On prend toutes les frettes sur la case et on met le barré de la plus petite à la plus grande


*/



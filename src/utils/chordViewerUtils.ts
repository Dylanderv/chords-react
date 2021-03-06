import PianoSVG from '../svg/PianoKeyboard';
import { IPianoChord, blackKeys } from '../model/piano/IPianoChord';
import { SVG_SIZE } from '../components/chords-viewer/ChordViewer';
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
export function renderPianoSvg(chord: IPianoChord, theme: 'light'|'dark') {
  const piano = new DOMParser().parseFromString(PianoSVG, 'text/xml');
  
  // Mise en place du thème
  if (theme === 'dark') {
    let pianoKeys = piano.getElementsByClassName('piano-key');
    for (let item in pianoKeys) {
      let pianoKey = pianoKeys[item];
      if (pianoKey.classList && pianoKey.classList.contains('white-key')) {
        pianoKey.setAttribute('fill', '#4B4B4B');
        pianoKey.setAttribute('stroke', '#979797');
      } else if (pianoKey.classList && pianoKey.classList.contains('black-key')) {
        pianoKey.setAttribute('fill', '#e5e5e5');
        pianoKey.setAttribute('stroke', '#555555');
      }
      
    }
  }


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

export function getGuitarUkuleleSvg(chord, instrumentName: string, theme: 'light' | 'dark') {
  let chordColor = {
    defaultColor: '#666', // default color
    // bgColor: '#FFF', // background color
    // strokeColor: '#666', // stroke color (overrides defaultColor)
    // textColor: '#666', // text color (overrides defaultColor)
    // stringColor: '#666', // string color (overrides defaultColor)
    // fretColor: '#666', // fret color (overrides defaultColor)
    // labelColor: '#666', // label color (overrides defaultColor)
  }
  if (theme === 'dark') {
    chordColor.defaultColor = '#ccc'
  }
  let selector = document.createElement('svg');
  let data;
    if (chord !== undefined && chord.position && chord.position.length > 0) {
      let numberString = instrumentName === 'guitar' ? 6 : 4;
      let chordList = chord.position[0].frets.map((fret, index) => fret === -1 ? [numberString - index, 'x'] : [numberString - index, fret]);

      data = {
        name: chord.key,
        chords: chordList,
        finger: chord.position[0].fingers,
        baseFret: chord.position[0].baseFret,
        barres: chord.position[0].barres!.map(barre => barreInterpretor(chord.position[0].frets, barre, instrumentName === 'guitar' ? 6 : 4))
      }
      const test = new ChordBox(selector, {
        numStrings: instrumentName === 'guitar' ? 6 : 4,
        width: SVG_SIZE.width,
        height: SVG_SIZE.height,
        ...chordColor
      });
      test.draw({
        chord: data.chords,
        position: data.baseFret,
        barres: data.barres,
        // tuning: chordsData.tunings.standard
      })
    }
  return selector;
}

function barreInterpretor(frets: number[], barre: number, chordsNumber: number) {
  let minFret = chordsNumber - 1;
  let maxFret = 0;

  for (let i = chordsNumber - 1; i >= 0; i--) {
    let fret = frets[i];
    if (fret === barre) {
      if (i < minFret) {
        minFret = i
      }
      if (i > maxFret) {
        maxFret = i
      }
    }
  }

  return {fromString: chordsNumber - minFret, toString: chordsNumber - maxFret, fret: barre}
}

/*

On part du principe que :
Quand on a un barré sur une case :
 - On prend toutes les frettes sur la case et on met le barré de la plus petite à la plus grande


*/



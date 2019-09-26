import PianoSVG from '../svg/PianoKeyboard';
import { IPianoChord, blackKeys } from '../model/piano/IPianoChord';

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
import * as pianoChords from '../data/pianoChords.json';
import * as ukuleleChord from '../data/ukuleleChords.json';
import * as guitarChords from '../data/guitarChords.json';

export function getInstrumentList() {
  return ['ukulele', 'guitar', 'piano'];
}

export function getPianoChords() {
  return pianoChords;
}

export function getUkuleleChords() {
  return ukuleleChord;
}

export function getGuitarChords() {
  return guitarChords;
}

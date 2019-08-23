import * as pianoChords from '../data/pianoChords.json';
import * as ukuleleChord from '../data/ukuleleChords.json';
import * as guitarChords from '../data/guitarChords.json';
import { IPianoChords } from '../model/piano/IPianoChords.js';
import { IUkuleleChords } from '../model/ukulele/IUkuleleChords.js';
import { IGuitarChords } from '../model/guitar/IGuitarChords.js';

export function getInstrumentList(): ['ukulele', 'guitar', 'piano'] {
  return ['ukulele', 'guitar', 'piano'];
}

export function getPianoChords(): IPianoChords {
  return pianoChords;
}

export function getUkuleleChords(): IUkuleleChords {
  return ukuleleChord;
}

export function getGuitarChords(): IGuitarChords {
  return guitarChords;
}

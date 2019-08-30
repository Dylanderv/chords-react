import {default as pianoChords} from '../data/pianoChords.json';
import {default as ukuleleChord} from '../data/ukuleleChords.json';
import {default as guitarChords} from '../data/guitarChords.json';
import { IPianoChords } from '../model/piano/IPianoChords.js';
import { IUkuleleChords } from '../model/ukulele/IUkuleleChords.js';
import { IGuitarChords } from '../model/guitar/IGuitarChords.js';

export function getInstrumentList(): {type: 'instrumentList', data: ['ukulele', 'guitar', 'piano']} {
  return {
    type: 'instrumentList',
    data: ['ukulele', 'guitar', 'piano']
  }
}

export function getPianoChords(): {type: 'piano', data: IPianoChords} {
  return {
    type: 'piano',
    data: pianoChords
  }
}

export function getUkuleleChords(): {type: 'ukulele', data: IUkuleleChords} {
  return {
    type: 'ukulele',
    data: ukuleleChord
  };
}

export function getGuitarChords(): {type: 'guitar', data: IGuitarChords} {
  return {
    type: 'guitar',
    data: guitarChords
  }
}

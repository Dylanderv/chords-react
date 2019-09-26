import {default as pianoChords} from '../data/pianoChords.json';
import {default as ukuleleChords} from '../data/ukuleleChords.json';
import {default as guitarChords} from '../data/guitarChords.json';
import { IPianoChords } from '../model/piano/IPianoChords';
import { IUkuleleChords } from '../model/ukulele/IUkuleleChords';
import { IGuitarChords } from '../model/guitar/IGuitarChords';

export function getInstrumentList(): {type: 'instrumentList', data: ['ukulele', 'guitar', 'piano']} {
  return {
    type: 'instrumentList',
    data: ['ukulele', 'guitar', 'piano']
  }
}

export function getPianoChords(): {type: 'piano', data: IPianoChords} {
  return {
    type: 'piano',
    data: pianoChords as IPianoChords
  }
}

export function getUkuleleChords(): {type: 'ukulele', data: IUkuleleChords} {
  return {
    type: 'ukulele',
    data: ukuleleChords
  };
}

export function getGuitarChords(): {type: 'guitar', data: IGuitarChords} {
  return {
    type: 'guitar',
    data: guitarChords
  }
}

export function getGuitarChordNames(): {type: 'guitar', data: { main: string[], suffixes: string[] }} {
  return {
    type: 'guitar',
    data: {
      main: Object.getOwnPropertyNames(guitarChords.chords),
      suffixes: guitarChords.suffixes
    }
  }
}

export function getUkuleleChordNames(): {type: 'ukulele', data: { main: string[], suffixes: string[] }} {
  return {
    type: 'ukulele',
    data: {
      main: Object.getOwnPropertyNames(ukuleleChords.chords),
      suffixes: ukuleleChords.suffixes,
    }
  }
}

export function getPianoChordNames(): {type: 'piano', data: { main: string[], suffixes: string[] }} {
  return {
    type: 'piano',
    data: {
      main: Object.getOwnPropertyNames(pianoChords.chords),
      suffixes: pianoChords.suffixes,
    }
  }
}

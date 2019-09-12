import {default as pianoChords} from '../data/pianoChords.json';
import {default as ukuleleChords} from '../data/ukuleleChords.json';
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
    data: ukuleleChords
  };
}

export function getGuitarChords(): {type: 'guitar', data: IGuitarChords} {
  return {
    type: 'guitar',
    data: guitarChords
  }
}

export function getGuitarChordNames(): {type: 'guitar', main: string[], suffixes: string[]} {
  return {
    type: 'guitar',
    main: Object.getOwnPropertyNames(guitarChords.chords),
    suffixes: guitarChords.suffixes,
  }
}

export function getUkuleleChordNames(): {type: 'ukulele', main: string[], suffixes: string[]} {
  return {
    type: 'ukulele',
    main: Object.getOwnPropertyNames(ukuleleChords.chords),
    suffixes: ukuleleChords.suffixes,
  }
}

export function getPianoChordNames(): {type: 'piano', main: string[], suffixes: string[]} {
  let mainData: string[] = [];
  let suffixesData: string[] = [];
  pianoChords.pianoChords.forEach(mainChord => {
    mainData.push(mainChord.type);
    mainChord.chords.forEach(chord => {
      suffixesData.push(chord.name);
    });
  });
  return {
    type: 'piano',
    main: mainData,
    suffixes: suffixesData
  }
}

import { IChordDBChords } from "../IChordDBChords";

export interface IUkuleleChords {
  main: {
    "strings": number,
    "fretsOnChord": number,
    "name": string,
    "numberOfChords": number
  },
  tunings: {
    "standard": string[]
  },
  keys: string[],
  suffixes: string[],
  chords: {
    C: IChordDBChords[],
    Db: IChordDBChords[],
    D: IChordDBChords[],
    Eb: IChordDBChords[],
    E: IChordDBChords[],
    F: IChordDBChords[],
    Gb: IChordDBChords[],
    G: IChordDBChords[],
    Ab: IChordDBChords[],
    A: IChordDBChords[],
    Bb: IChordDBChords[],
    B: IChordDBChords[]
  }
}

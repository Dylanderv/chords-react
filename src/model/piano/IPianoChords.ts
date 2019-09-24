import { IPianoChord } from "./IPianoChord";

export interface IPianoChords {
  main: {
    "name": string,
  },
  tunings: {
  },
  keys: string[],
  suffixes: string[],
  chords: {
    C: IPianoChord[],
    Csharp: IPianoChord[],
    Db: IPianoChord[],
    D: IPianoChord[],
    Dsharp: IPianoChord[],
    Eb: IPianoChord[],
    E: IPianoChord[],
    F: IPianoChord[],
    Fsharp: IPianoChord[],
    Gb: IPianoChord[],
    G: IPianoChord[],
    Gsharp: IPianoChord[],
    Ab: IPianoChord[],
    A: IPianoChord[],
    Asharp: IPianoChord[],
    Bb: IPianoChord[],
    B: IPianoChords[]
  }
}

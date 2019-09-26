import { IPianoChord } from "./IPianoChord";

export interface IPianoChords {
  main: {
    "name": string,
  },
  tunings: {
  },
  keys: PianoKeys[],
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
    B: IPianoChord[]
  }
}

export type PianoKeys = "C"|"Csharp"|"Db"|"D"|"Dsharp"|"Eb"|"E"|"F"|"Fsharp"|"Gb"|"G"|"Gsharp"|"Ab"|"A"|"Asharp"|"Bb"|"B"

import { IChordDBChords } from "../IChordDBChords";

export interface IGuitarChords {
  main: {
    "strings": number,
    "fretsOnChord": number,
    "name": string,
    "numberOfChords": number
  },
  tunnings: {
    "standard": string[]
  },
  keys: string[],
  suffixes: string[],
  chords: {
    "C": IChordDBChords[],
    "Csharp": IChordDBChords[],
    "D": IChordDBChords[],
    "Eb": IChordDBChords[],
    "E": IChordDBChords[],
    "F": IChordDBChords[],
    "Fsharp": IChordDBChords[],
    "G": IChordDBChords[],
    "Ab": IChordDBChords[],
    "A": IChordDBChords[],
    "Bb": IChordDBChords[],
    "B": IChordDBChords[]
  }
}

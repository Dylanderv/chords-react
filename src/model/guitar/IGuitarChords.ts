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
    "C#": IChordDBChords[],
    "D": IChordDBChords[],
    "Eb": IChordDBChords[],
    "E": IChordDBChords[],
    "F": IChordDBChords[],
    "F#": IChordDBChords[],
    "G": IChordDBChords[],
    "Ab": IChordDBChords[],
    "A": IChordDBChords[],
    "Bb": IChordDBChords[],
    "B": IChordDBChords[]
  }
}

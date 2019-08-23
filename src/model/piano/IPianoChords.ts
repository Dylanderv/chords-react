export interface IPianoChords {
  pianoChords: {
    type: string,
    chords: {
      name: string,
      keys: {name: string}[]
    }[]
  }[]
}

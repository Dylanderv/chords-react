export interface IChordDBChords {
  key: string,
  suffix: string,
  positions: ({
    frets: number[],
    fingers: number[],
    baseFret: number,
    barres: number[],
    midi: number[]
  } | {
    frets: number[],
    fingers: number[],
    baseFret: number,
    barres: number[],
    midi: number[],
    capo: boolean
  })[]
  

}

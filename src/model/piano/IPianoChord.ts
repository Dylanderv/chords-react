export interface IPianoChord {
  key: string,
  suffix: string,
  position: ({ name: whiteKeys|blackKeys })[]
}

export type whiteKeys = "C"|"D"|"E"|"F"|"G"|"A"|"B";
export type blackKeys = "Db"|"Eb"|"Gb"|"Ab"|"Bb"|"Csharp"|"Dsharp"|"Fsharp"|"Gsharp"|"Asharp";
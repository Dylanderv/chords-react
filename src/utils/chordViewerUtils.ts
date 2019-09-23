import { IPayloadChordInstrumentList } from "../model/IPayloadChordInstrumentList";
import { IGuitarChords } from "../model/guitar/IGuitarChords";
import { IUkuleleChords } from "../model/ukulele/IUkuleleChords";
import { IPianoChords } from "../model/piano/IPianoChords";

export function getDisplayDataFromInstrumentSelector(payload: IPayloadChordInstrumentList) {
  switch (payload.type) {
    case "guitar":
      let guitarData = Object.getOwnPropertyNames((payload.data as IGuitarChords).chords);
      return guitarData;
    case "ukulele":
      let ukuleleData = Object.getOwnPropertyNames((payload.data as IUkuleleChords).chords);
      return ukuleleData
    case "piano":
      let pianoData: string[] = [];
      (payload.data as IPianoChords).pianoChords.forEach(elem => pianoData.push(elem.type));
      return pianoData
    case "instrumentList":
      return (payload.data as ['ukulele', 'guitar', 'piano'])
  }
}

type mainChordGuitar = "C"|"Csharp"|"D"|"Eb"|"E"|"F"|"Fsharp"|"G"|"Ab"|"A"|"Bb"|"B";
type mainChordUkulele = "C"|"Db"|"D"|"Eb"|"E"|"F"|"Gb"|"G"|"Ab"|"A"|"Bb"|"B";

export function getDisplayDataFromMainChordSelector(payload: IPayloadChordInstrumentList, mainChord: any/*mainChordGuitar | mainChordUkulele*/) {
  switch (payload.type) {
    case "guitar":
      let guitarData: string[] = [];
      (payload.data as IGuitarChords).chords[mainChord as mainChordGuitar].forEach(elem => guitarData.push(mainChord + elem.suffix))
      return guitarData;
    case "ukulele":
      let ukuleleData: string[] = [];
      (payload.data as IUkuleleChords).chords[mainChord as mainChordUkulele].forEach(elem => ukuleleData.push(mainChord + elem.suffix))
      return ukuleleData
    case "piano":
      let pianoData: string[] = [];
      let indexMainChord: number = (payload.data as IPianoChords).pianoChords.findIndex(elem => elem.type === mainChord);
      (payload.data as IPianoChords).pianoChords[indexMainChord].chords.forEach(elem => pianoData.push(elem.name));
      return pianoData
    case "instrumentList":
      return (payload.data as ['ukulele', 'guitar', 'piano'])
  }
}

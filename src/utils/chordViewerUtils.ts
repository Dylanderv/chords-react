import { IPayloadChordInstrumentList } from "../model/IPayloadChordInstrumentList";
import { IGuitarChords } from "../model/guitar/IGuitarChords";
import { IUkuleleChords } from "../model/ukulele/IUkuleleChords";
import { IPianoChords } from "../model/piano/IPianoChords";
import { InstrumentType } from "../model/InstrumentType";

function getDisplayDataFromInstrumentSelector(payload: IPayloadChordInstrumentList) {
  switch (payload.type) {
    case "guitar":
      let guitarData = Object.getOwnPropertyNames((payload.data as IGuitarChords).chords);
      return guitarData;
      break;
    case "ukulele":
      console.log('PAYLOADsfa')
      console.log(payload.data as IUkuleleChords)
      let ukuleleData = Object.getOwnPropertyNames((payload.data as IUkuleleChords).chords);
      return ukuleleData
      break;
    case "piano":
      let pianoData: string[] = [];
      (payload.data as IPianoChords).pianoChords.forEach(elem => pianoData.push(elem.type));
      return pianoData
      break;
    case "instrumentList":
      return (payload.data as ['ukulele', 'guitar', 'piano'])
      break;
  }
}

export {getDisplayDataFromInstrumentSelector};
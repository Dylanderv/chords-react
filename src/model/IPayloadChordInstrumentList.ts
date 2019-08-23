import { IGuitarChords } from "./guitar/IGuitarChords";
import { IPianoChords } from "./piano/IPianoChords";
import { IUkuleleChords } from "./ukulele/IUkuleleChords";
import { InstrumentType } from "./InstrumentType";

export interface IPayloadChordInstrumentList {
  type: InstrumentType|'instrumentList',
  data: ['ukulele', 'guitar', 'piano']|IGuitarChords|IPianoChords|IUkuleleChords
}

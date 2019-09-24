import { IGuitarChords } from "./guitar/IGuitarChords";
import { IPianoChords } from "./piano/IPianoChords";
import { IUkuleleChords } from "./ukulele/IUkuleleChords";
import { InstrumentType } from "./InstrumentType";

export interface IPayloadChordInstrumentList {
  type: InstrumentType|'instrumentList'|'chordName'|'guitarChordName' | 'ukuleleChordName' | 'pianoChordName';
  data: ['ukulele', 'guitar', 'piano']|IGuitarChords|IPianoChords|IUkuleleChords|IPayloadChordNameItem[]|DataChordNameItem;
}

export interface IPayloadChordName {
  type: 'guitarChordName' | 'ukuleleChordName' | 'pianoChordName';
  data: DataChordNameItem;
}

export type IPayloadChordNameItem = {type: InstrumentType, data: DataChordNameItem}
type DataChordNameItem = { main: string[], suffixes: string[] }
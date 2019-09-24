import { IPianoChords } from "../model/piano/IPianoChords";
import { IUkuleleChords } from "../model/ukulele/IUkuleleChords";
import { IGuitarChords } from "../model/guitar/IGuitarChords";
import { InstrumentType } from "../model/InstrumentType";

/**
 * Retrieve all the main chord
 * @param chordData chord object
 * @param instrument instrument name
 */
export function getMainChords(chordData: IPianoChords|IUkuleleChords|IGuitarChords): string[] {
  return chordData.keys;
}

/**
 * Retrieve all the suffixes for one main chord
 * @param chordData chord object
 * @param instrument instrument type information
 * @param mainChord mainChord name
 */
export function getSuffixes(chordData: IPianoChords|IUkuleleChords|IGuitarChords): string[] {
  return chordData.suffixes;
}

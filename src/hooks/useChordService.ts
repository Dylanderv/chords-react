import { Service } from "../model/Service";
import { useState, useEffect } from "react";
import { getUkuleleChords, getPianoChords, getGuitarChords, getInstrumentList } from "../services/chordFetchService";
import { InstrumentType } from "../model/InstrumentType";
import { IPayloadChordInstrumentList } from "../model/IPayloadChordInstrumentList";

const useChordService = (instrument: InstrumentType | 'instrumentList') => {
  const [result, setResult] = useState<Service<IPayloadChordInstrumentList>>({
    status: 'loading'
  });
  
  useEffect(() => {
    switch (instrument) {
      case 'ukulele':
        setResult({ status: 'loaded', payload: getUkuleleChords() })
        break;
      case 'guitar':
        setResult({ status: 'loaded', payload: getGuitarChords() })
        break;
      case 'piano':
        setResult({ status: 'loaded', payload: getPianoChords() })
        break;
      case 'instrumentList':
        setResult({ status: 'loaded', payload: getInstrumentList() })
        break;
      default:
        setResult({ status: 'error', error: new Error('undefined instrument') })
        break;
    }
  }, [instrument]);

  return result;
}

export default useChordService;

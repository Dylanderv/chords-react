import { Service } from "../model/Service";
import { useState, useEffect } from "react";
import { getUkuleleChords, getPianoChords, getGuitarChords, getInstrumentList } from "../services/chordFetchService";

const useChordService = (instrument: 'ukulele' | 'piano' | 'guitar' | 'instrumentList') => {
  const [result, setResult] = useState<Service<any>>({
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
  });

  return result;
}

export default useChordService;

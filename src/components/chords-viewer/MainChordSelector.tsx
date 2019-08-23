import React from 'react';
import useChordService from '../../hooks/useChordService';
import { Selector } from '../Selector';
import { getDisplayDataFromChordViewerService } from '../../utils/chordViewerUtils';
import { InstrumentType } from '../../model/InstrumentType';

interface IProps {
  instrument: InstrumentType|'instrumentList'
}

const MainChordSelector: React.FC<IProps> = (prop) => {
  const service = useChordService(prop.instrument);
  console.log("SERVICE")
  console.log(service)
  let dataToDisplay = [""];
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
    dataToDisplay = getDisplayDataFromChordViewerService(service.payload);
  }
  console.log(dataToDisplay)
  return (
      <div>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
          <Selector items={dataToDisplay}></Selector>
        )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default MainChordSelector;
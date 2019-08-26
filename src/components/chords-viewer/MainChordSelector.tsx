import React from 'react';
import useChordService from '../../hooks/useChordService';
import { InstrumentType } from '../../model/InstrumentType';
import { getDisplayDataFromInstrumentSelector } from '../../utils/chordViewerUtils';
import { PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';
import SecondChordSelector from './SecondChordSelector';

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
    dataToDisplay = getDisplayDataFromInstrumentSelector(service.payload);
  }
  console.log(dataToDisplay)
  return (
      <div>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
          <Pivot>
          {dataToDisplay.map(item => <PivotItem headerText={item} key={item}>
            <SecondChordSelector instrument={prop.instrument} chord={item}></SecondChordSelector>
          </PivotItem>)}
        </Pivot>
        )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default MainChordSelector;
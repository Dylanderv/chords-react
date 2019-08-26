import React from 'react';
import useChordService from '../../hooks/useChordService';
import { InstrumentType } from '../../model/InstrumentType';
import { getDisplayDataFromMainChordSelector } from '../../utils/chordViewerUtils';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

interface IProps {
  instrument: InstrumentType|'instrumentList',
  chord: string
}

const SecondChordSelector: React.FC<IProps> = (prop) => {
  const service = useChordService(prop.instrument);
  console.log("SERVICE")
  console.log(service)
  let rawDataToDisplay = [""];
  const dataToDisplay: IDropdownOption[] = [];
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
    rawDataToDisplay = getDisplayDataFromMainChordSelector(service.payload, prop.chord);

    rawDataToDisplay.forEach(elem => dataToDisplay.push({key: elem, text: elem}))
  }
  return (
      <div>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
        //   <Pivot>
        //   {dataToDisplay.map(item => 
        //     <div>
        //       <PivotItem headerText={item} key={item}>
        //         {item}
        //       </PivotItem>
        //     </div>
        //   )}
        // </Pivot>
          <Dropdown options={dataToDisplay}></Dropdown>
         )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default SecondChordSelector;
import React from 'react';
import { Selector } from '../Selector';
import useChordService from '../../hooks/useChordService';
import { Service } from '../../model/Service';
import MainChordSelector from '../chords-viewer/MainChordSelector';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';

const InstrumentSelector: React.FC = () => {
  const service = useChordService("instrumentList") as Service<{type: 'instrumentList', data: ['ukulele', 'guitar', 'piano']}>;
  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && (
        <Pivot>
          {service.payload.data.map(item => <PivotItem headerText={item} key={item}>
            <MainChordSelector instrument={item}></MainChordSelector>
          </PivotItem>)}
        </Pivot>
        // <Selector items={service.payload.data}></Selector>
      )}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  )
}

export default InstrumentSelector;
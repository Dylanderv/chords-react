import React from 'react';
import { Selector } from '../Selector';
import useChordService from '../../hooks/useChordService';
import { Service } from '../../model/Service';

const InstrumentSelector: React.FC = () => {
  const service = useChordService("instrumentList") as Service<{type: 'instrumentList', data: ['ukulele', 'guitar', 'piano']}>;
  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && (
        <Selector children="salut" items={service.payload.data}></Selector>
      )}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  )

}

export default InstrumentSelector;
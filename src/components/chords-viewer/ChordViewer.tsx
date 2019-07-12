import React from 'react';
import useChordService from '../../hooks/useChordService';
import { Selector } from './Selector';

const ChordViewer: React.FC = () => {
  const service = useChordService('instrumentList');
  console.log(service)
  return (
      <div>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
          <Selector items={['test', 'toust']}></Selector>
        )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default ChordViewer;
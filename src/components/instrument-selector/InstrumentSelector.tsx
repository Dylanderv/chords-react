import React from 'react';
import useChordService from '../../hooks/useChordService';
import { Service } from '../../model/Service';
import { Link } from 'react-router-dom';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';

const InstrumentSelector: React.FC = () => {
  const service = useChordService("instrumentList") as Service<{type: 'instrumentList', data: ['ukulele', 'guitar', 'piano']}>;
  
  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && (
        <div>
          {service.payload.data.map(item => <Link key={item} to={CHORD_VIEWER_BASE_ROUTE + '/' + item}>{item}</Link>)}
        </div>
        // <Selector items={service.payload.data}></Selector>
      )}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  )
}

export default InstrumentSelector;
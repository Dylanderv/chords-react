import React from 'react';
import useChordService from '../../hooks/useChordService';
import { Service } from '../../model/Service';
import { Link } from 'react-router-dom';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ICommandBarItemProps, CommandBar } from 'office-ui-fabric-react';

const InstrumentSelector: React.FC = () => {
  const service = useChordService("instrumentList") as Service<{type: 'instrumentList', data: ['ukulele', 'guitar', 'piano']}>;
  const { history } = useReactRouter();
  let data: ICommandBarItemProps[] = [];
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector

    data = service.payload.data.map(data => ({
      key: data,
      name: data,
      // href: CHORD_VIEWER_BASE_ROUTE + "/" + match.params.instrument + '/' + data,
      onClick: () => {history.push(CHORD_VIEWER_BASE_ROUTE + "/" + data)}
    }))

  }

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && (
        <div>
          <CommandBar items={data}></CommandBar>
        </div>
        )}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  )
}

export default InstrumentSelector;
import React from 'react';
import useChordService from '../../hooks/useChordService';
import { InstrumentType } from '../../model/InstrumentType';
import { getDisplayDataFromInstrumentSelector } from '../../utils/chordViewerUtils';
import { PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';
import { RouteComponentProps } from 'react-router';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import { useReactRouter } from '../../hooks/useReactRouter';
import { CommandBar, ICommandBarItemProps, Icon } from 'office-ui-fabric-react';
import { Link } from 'react-router-dom';

type TParams = {instrument: InstrumentType|'instrumentList'}

function MainChordSelector ({ match }: RouteComponentProps<TParams>) {
  const service = useChordService(match.params.instrument);
  const { history } = useReactRouter();

  let dataToDisplay = [""];
  let items: ICommandBarItemProps[] = [];
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
    dataToDisplay = getDisplayDataFromInstrumentSelector(service.payload);
    items = dataToDisplay.map(data => ({
      key: data,
      name: data,
      // href: CHORD_VIEWER_BASE_ROUTE + "/" + match.params.instrument + '/' + data,
      onClick: () => {history.push(CHORD_VIEWER_BASE_ROUTE + "/" + match.params.instrument + '/' + data)}
    }))


  }

  return (
      <div>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
        <div>
          <CommandBar items={items}></CommandBar>
        </div>
        )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default MainChordSelector;
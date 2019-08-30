import React from 'react';
import useChordService from '../../hooks/useChordService';
import { InstrumentType } from '../../model/InstrumentType';
import { getDisplayDataFromMainChordSelector } from '../../utils/chordViewerUtils';
import { INavLinkGroup, ICommandBarItemProps, CommandBar } from 'office-ui-fabric-react'
import { RouteComponentProps } from 'react-router';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import FabricNavReactRouter from '../FabricNavReactRouter';
import { link } from 'fs';
import { url } from 'inspector';
import { useReactRouter } from '../../hooks/useReactRouter';

type TParams = {instrument: InstrumentType|'instrumentList', mainChord: string}


function SecondChordSelector ({ match }: RouteComponentProps<TParams>) {
  const service = useChordService(match.params.instrument);
  const { history } = useReactRouter();
  let rawData: string[] = [];
  let data: ICommandBarItemProps[] = [];
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
    rawData = getDisplayDataFromMainChordSelector(service.payload, match.params.mainChord);

    data = rawData.map(data => ({
      key: data,
      name: data,
      // href: CHORD_VIEWER_BASE_ROUTE + "/" + match.params.instrument + '/' + data,
      onClick: () => {history.push(CHORD_VIEWER_BASE_ROUTE + "/" + match.params.instrument + '/' + match.params.mainChord + '/' + data)}
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

export default SecondChordSelector;

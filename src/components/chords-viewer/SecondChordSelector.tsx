import React from 'react';
import useChordService from '../../hooks/useChordService';
import { InstrumentType } from '../../model/InstrumentType';
import { getDisplayDataFromMainChordSelector } from '../../utils/chordViewerUtils';
import { INavLinkGroup } from 'office-ui-fabric-react'
import { RouteComponentProps } from 'react-router';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import FabricNavReactRouter from '../FabricNavReactRouter';
import { link } from 'fs';
import { url } from 'inspector';

type TParams = {instrument: InstrumentType|'instrumentList', mainChord: string}


function SecondChordSelector ({ match }: RouteComponentProps<TParams>) {
  const service = useChordService(match.params.instrument);
  let rawData: string[] = [];
  let data: INavLinkGroup[] = [];
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
    rawData = getDisplayDataFromMainChordSelector(service.payload, match.params.mainChord);

    data = [{
      name: 'chord',
      links: rawData.map(elem => ({
        key: elem,
        name: elem,
        url: CHORD_VIEWER_BASE_ROUTE + '/' + match.params.instrument + '/' + match.params.mainChord + '/' + elem
      }))
    }]

    

  }
  return (
      <div>
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
          <div>
            <FabricNavReactRouter groups={data}></FabricNavReactRouter>
          </div>
          
         )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

export default SecondChordSelector;

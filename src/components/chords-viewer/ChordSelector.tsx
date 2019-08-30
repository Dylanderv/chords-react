import React from 'react';
import useChordService from '../../hooks/useChordService';
import { InstrumentType } from '../../model/InstrumentType';
import { getDisplayDataFromInstrumentSelector, getDisplayDataFromMainChordSelector } from '../../utils/chordViewerUtils';
import { RouteComponentProps } from 'react-router';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import { INavLinkGroup } from 'office-ui-fabric-react';
import FabricNavReactRouter from '../FabricNavReactRouter';

type TParams = {instrument: InstrumentType|'instrumentList'}

function ChordSelector ({ match }: RouteComponentProps<TParams>) {
  const service = useChordService(match.params.instrument);
  let rawData: string[] = [];
  let data: INavLinkGroup[] = [];
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
    rawData = getDisplayDataFromInstrumentSelector(service.payload);

    data = rawData.map(mainChord => ({
        name: mainChord,
        isExpanded: false,
        links: getDisplayDataFromMainChordSelector(service.payload, mainChord).map(secondChord => ({
          name: secondChord,
          key: secondChord,
          url: CHORD_VIEWER_BASE_ROUTE + '/' + match.params.instrument + '/' + mainChord + '/' + secondChord
        }))
      }))

      console.log(data);

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

export default ChordSelector;
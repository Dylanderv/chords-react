import React from 'react';
import useChordService from '../../hooks/useChordService';
import { InstrumentType } from '../../model/InstrumentType';
import { getDisplayDataFromMainChordSelector } from '../../utils/chordViewerUtils';
import { INavLinkGroup, ICommandBarItemProps, CommandBar, Customizer, ICommandBarStyles, CommandBarButton, IButtonProps } from 'office-ui-fabric-react'
import { RouteComponentProps } from 'react-router';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import FabricNavReactRouter from '../FabricNavReactRouter';
import { link } from 'fs';
import { url } from 'inspector';
import { useReactRouter } from '../../hooks/useReactRouter';
import { IComponentStyles } from '@uifabric/foundation';

type TParams = {instrument: InstrumentType|'instrumentList', mainChord: string}

let selected: string;

function SecondChordSelector ({ match }: RouteComponentProps<TParams>) {
  const service = useChordService(match.params.instrument);
  const { history } = useReactRouter();
  let rawData: string[] = [];
  let data: ICommandBarItemProps[] = [];
  let dataFirst: ICommandBarItemProps[] = [];
  let dataLast: ICommandBarItemProps[] = [];
  if (service.status === "loaded") {
    // Récupérer les données à afficher dans le selector
    rawData = getDisplayDataFromMainChordSelector(service.payload, match.params.mainChord);

    data = rawData.map(data => ({
      key: data,
      name: data,
      // href: CHORD_VIEWER_BASE_ROUTE + "/" + match.params.instrument + '/' + data,
      onClick: () => {
        selected = data;
        history.push(CHORD_VIEWER_BASE_ROUTE + "/" + match.params.instrument + '/' + match.params.mainChord + '/' + data);
      }
    }))

    let i = 0;
    while(i < data.length && i < 10) {
      dataFirst.push(data[i])
      i++;
    }
    while (i < data.length) {
      dataLast.push(data[i])
      i++;
    }

    console.log('done');

  }
  return (
      <div>

        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' && (
          <div>
            <CommandBar buttonAs={customButton} items={dataFirst} overflowItems={dataLast}></CommandBar>
          </div>
          
         )}
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    )
}

// https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.ButtonAs.Example.tsx

const customButton = (props: IButtonProps) => {
  if (props.name === selected) {
    return (
      <CommandBarButton {...props} styles={{...props.styles, root: {background: "#f5f5f5", color: "#1989fa"}}}/>
    );
  } else {
    return (
      <CommandBarButton {...props} styles={{...props.styles}}/>
    );
  }
  
};

export default SecondChordSelector;

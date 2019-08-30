import React from 'react';
import useChordService from '../../hooks/useChordService';
import { Service } from '../../model/Service';
import { Link } from 'react-router-dom';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ICommandBarItemProps, CommandBar, CommandBarButton, IButtonProps } from 'office-ui-fabric-react';

let selected: string;

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
      onClick: () => {
        selected = data;
        history.push(CHORD_VIEWER_BASE_ROUTE + "/" + data)
      }
    }))

  }

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && (
        <div>
          <CommandBar buttonAs={customButton} items={data}></CommandBar>
        </div>
        )}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  )
}

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

export default InstrumentSelector;
import React from 'react'
import { Nav, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav'
import { useReactRouter } from '../hooks/useReactRouter';

interface IProps {
  groups: INavLinkGroup[]
}

function FabricNavReactRouter (props: IProps) {

  const { history } = useReactRouter();

  return (
    <Nav styles={{root: {width: 208,boxSizing: 'border-box',border: '1px solid #eee',overflowY: 'auto'}}}
      onLinkClick={(event, element) => {
        if (event && element) {
          event.preventDefault();
          history.push(element.url);
        }
      }}
      groups={props.groups}
    />
  )
}

export default FabricNavReactRouter;

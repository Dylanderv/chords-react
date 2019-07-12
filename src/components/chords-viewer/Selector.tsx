import React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { IStyleSet } from '@uifabric/styling';

interface IProps {
  items: string[]
}

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 }
};

export const Selector = React.memo<IProps>( ({ items }) => {


  return (
    <Pivot>
      {items.map(item => <PivotItem><Label styles={labelStyles}>item</Label></PivotItem>)}
    </Pivot>
  )
})

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

export class Selector extends React.Component<IProps> {  

  render() {
    console.log(this.props)
    return (
      <Pivot>
      {this.props.items.map(item => <PivotItem headerText={item} key={item}><Label styles={labelStyles}>{item}</Label></PivotItem>)}
      </Pivot>
    )
  
  }
}

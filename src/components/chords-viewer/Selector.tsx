import React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

interface IProps {
  items: string[]
}

export const Selector = React.memo<IProps>( ({ items }) => {
  console.log("ITEMS")
  console.log(items)

  return (
    <Pivot>
      {items.map(item => <PivotItem key={item} headerText={item}></PivotItem>)}
    </Pivot>
  )
})

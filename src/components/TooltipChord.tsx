import React from 'react';
import { withStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import ChordViewer from './chords-viewer/ChordViewer';

const NoBackgroundTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
}))(Tooltip);

type TooltipChordProps = { chordKey: string, chordSuffix: string, instrumentId: string, instrumentName: string }

const TooltipChord: React.FC<TooltipChordProps> = ({ chordKey, chordSuffix, instrumentId, instrumentName }) => {
  return (
  <NoBackgroundTooltip placement="right-start" style={{ display: "inline" }}
    title={
      <ChordViewer isInPartition={true}
        instrumentId={instrumentId} instrumentName={instrumentName} mainKey={chordKey} suffix={chordSuffix}
      ></ChordViewer>
    }
  >
    <Typography variant="inherit" display="inline" style={{ fontWeight: "bold", display: 'inline' }}>{chordKey + chordSuffix}</Typography>
  </NoBackgroundTooltip>
  )
}

export default TooltipChord;

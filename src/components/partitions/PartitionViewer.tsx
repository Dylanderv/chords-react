import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useReactRouter } from '../../hooks/useReactRouter';
import { StaticContext, RouteComponentProps } from 'react-router';
import ChordViewer from '../chords-viewer/ChordViewer';
import ChordSelector from '../selector/ChordSelector';
import { Tooltip, withStyles, Theme, Button, Typography } from '@material-ui/core';

function partitionQueryGetter(partitionId: string) {
  return gql`
    {
      partition(id: "${partitionId}") {
        id
        name
        creationDate
        updatedAt
        visibility
        chords {
          id
          key
          suffix
          position
          instrument {
            id
            name
          }
        }
        owner {
          username
        }
      }
    }
  `
}

type TParams = { partitionId: string }

const NoBackgroundTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
}))(Tooltip);

const PartitionViewer: React.FC = () => {
  const { match } = useReactRouter() as RouteComponentProps<TParams, StaticContext, any>
  const { data, loading, error } = useQuery(partitionQueryGetter(match.params.partitionId));
  if (loading === false && error === undefined) {
    console.log(data);
  }
  return (
    <div>
        {loading === true && <div>Loading...</div>}
        {loading === false && error === undefined && data !== undefined && (
        <div>
          {data.partition.chords.map(chord => 
          <div>
            <NoBackgroundTooltip placement="right-start"
              title={
                <ChordViewer key={chord.id}
                  instrumentId={chord.instrument.id} instrumentName={chord.instrument.name} mainKey={chord.key} suffix={chord.suffix}
                ></ChordViewer>
              }
            >
              <span>{chord.key + chord.suffix}</span>
            </NoBackgroundTooltip>
            
          </div>
          )}
          
        </div>
        )}
        {error !== undefined && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
  )
}

export default PartitionViewer;
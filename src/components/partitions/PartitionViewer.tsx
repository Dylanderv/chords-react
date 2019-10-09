import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useReactRouter } from '../../hooks/useReactRouter';
import { StaticContext, RouteComponentProps } from 'react-router';
import ChordViewer from '../chords-viewer/ChordViewer';
import { Tooltip, withStyles, Theme, Fab, createStyles, Typography } from '@material-ui/core';
import { authContext } from '../../contexts/AuthContext';
import { PARTITION_EDITOR_BASE_ROUTE } from '../../utils/routerUtils';
import { makeStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';


function partitionQueryGetter(partitionId: string) {
  return gql`
    {
      partition(id: "${partitionId}") {
        id
        name
        creationDate
        updatedAt
        visibility
        content
        chords {
          id
          key
          suffix
          position
        }
        owner {
          id
          username
        }
        instrument {
          id
          name
        }
      }
    }
  `
}

type TParams = { partitionId: string }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),

    }
  }),
);

const NoBackgroundTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
}))(Tooltip);

const PartitionViewer: React.FC = () => {
  const { match } = useReactRouter() as RouteComponentProps<TParams, StaticContext, any>
  const { data, loading, error } = useQuery(partitionQueryGetter(match.params.partitionId));
  const auth = useContext(authContext);
  const classes = useStyles();
  
  return (
    <div>
        {loading === true && <div>Loading...</div>}
        {loading === false && error === undefined && data !== undefined && (
        <div>
          <Typography variant="h3" gutterBottom>{data.partition.name}</Typography>
          {data.partition.chords.map(chord => 
          <div key={chord.id}>
            <NoBackgroundTooltip placement="right-start"
              title={
                <ChordViewer key={chord.id} isInPartition={true}
                  instrumentId={data.partition.instrument.id} instrumentName={data.partition.instrument.name} mainKey={chord.key} suffix={chord.suffix}
                ></ChordViewer>
              }
            >
              <span>{chord.key + chord.suffix}</span>
            </NoBackgroundTooltip>
            
          </div>
          )}
          <p>{data.partition.content}</p>
          {auth.auth.id !== '0' && auth.auth.id === data.partition.owner.id &&
            <Fab component={Link} to={PARTITION_EDITOR_BASE_ROUTE + '/' + data.partition.id} color='secondary' className={classes.fab}><EditIcon/></Fab>
          }
        </div>
        )}
        {error !== undefined && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
  )
}

export default PartitionViewer;
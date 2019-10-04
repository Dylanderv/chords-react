import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Fab, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import { NEW_PARTITION_BASE_ROUTE, PARTITION_LIST_BASE_ROUTE } from '../../utils/routerUtils';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useReactRouter } from '../../hooks/useReactRouter';

const PARTITIONS_QUERY = gql`
  {
    partitions {
      id
      name
      creationDate
      updatedAt
      visibility
      owner {
        id
        username
      }
      chords {
        key
        suffix
        position
        instrument {
          name
        }
      }
    }
  }
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),

    },
  }),
);

export const PartitionList: React.FC = () => {
  const { data, error, loading } = useQuery(PARTITIONS_QUERY);
  const classes = useStyles();
  const { history } = useReactRouter();

  if (loading === false && error === undefined) {
    console.log(data);
  }

  return (
    <div>
        {loading === true && <div>Loading...</div>}
        {loading === false && error === undefined && (
        <div>
          WSH
          <Fab component={Link} to={PARTITION_LIST_BASE_ROUTE + '/new'} color='secondary' className={classes.fab}><AddIcon/></Fab>
        </div>
        )}
        {error !== undefined && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
  )
}
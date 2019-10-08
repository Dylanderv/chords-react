import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Fab, Theme, Card, CardActionArea, CardContent, Typography, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import { PARTITION_EDITOR_BASE_ROUTE, PARTITION_BASE_ROUTE } from '../../utils/routerUtils';
import { Link } from 'react-router-dom';
import { useReactRouter } from '../../hooks/useReactRouter';
import Partition from '../../model/Partition';

const PARTITIONS_QUERY = gql`
  {
    partitions {
      id
      name
      owner {
        username
      }
      instrument {
        name
      }
    }
  }
`

type queryPartition = { partitions: Partition[] }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),

    },
    card: {
      maxWidth: 345,
    }
  }),
);

export const PartitionList: React.FC = () => {
  const { data, error, loading } = useQuery<queryPartition>(PARTITIONS_QUERY);
  const classes = useStyles();
  const { history } = useReactRouter();


  const handleClickPartition = (partitionId: string) => {
    history.replace(PARTITION_BASE_ROUTE + '/' + partitionId);
  }

  return (
    <div>
        {loading === true && <div>Loading...</div>}
        {loading === false && error === undefined && data !== undefined && (
        <div>
          <Grid container spacing={10} style={{ minHeight: '100vh', padding: 10 }}>
            {data.partitions.map(partition => <Grid key={partition.id} item onClick={() => handleClickPartition(partition.id)}>{getCardFromPartition(partition)}</Grid>)}
          </Grid>
          <Fab component={Link} to={PARTITION_EDITOR_BASE_ROUTE + '/new'} color='secondary' className={classes.fab}><AddIcon/></Fab>
        </div>
        )}
        {error !== undefined && (
          <div>Error, the backend moved to the dark side. {error}</div>
        )}
      </div>
  )
}

function getCardFromPartition(partition: Partition) {
  return (
    <Card style={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {partition.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {partition.instrument ? partition.instrument.name : "Partition vide"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Créée par : {partition.owner.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
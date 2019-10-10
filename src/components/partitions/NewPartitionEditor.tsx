import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/AuthContext';
import { Grid, TextField, Button, Paper, FormControl, createStyles, Theme, MenuItem, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { PartitionInput, Visibility } from '../chords-viewer/AddToPartitionButton';
import { notificationContext } from '../../contexts/NotificationContext';
import { useReactRouter } from '../../hooks/useReactRouter';
import { PARTITION_LIST_BASE_ROUTE } from '../../utils/routerUtils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

const INSTRUMENT_LIST_QUERY = gql`
{
  instruments {
    id
    name
  }
}
`

const NEW_PARTITION_MUTATION = gql`
  mutation CreatePartition($partitionInput: PartitionInput) {
    createPartition (partitionInput: $partitionInput) {
      id
    }
  }
`

export const NewPartitionEditor: React.FC = () => {
  const auth = useContext(authContext);
  const notificationHandler = useContext(notificationContext);
  const { history } = useReactRouter();
  const [partitionName, setPartitionName] = useState('');
  const [inputError, setInputError] = useState(false);
  const [instrumentSelected, setInstrumentSelected] = useState('');
  const [selectInstrumentError, setSelectInstrumentError] = useState(false);
  const [selectVisibilityError, setSelectVisibilityError] = useState(false);
  const [visibilitySelected, setVisibilitySelected] = useState<Visibility>(Visibility.PUBLIC);
  const classes = useStyles();
  const { data, loading, error } = useQuery(INSTRUMENT_LIST_QUERY);
  const [ createPartition, { loading: mutationLoading, error: mutationError } ] = useMutation(NEW_PARTITION_MUTATION);

  const handleInput = (ev) => {
    if (ev.target.value === '' ) {
      setInputError(true);
    } else {
      setInputError(false);
    }
    setPartitionName(ev.target.value)
  }

  const handleSelectChange = (ev) => {
    if (selectInstrumentError) setSelectInstrumentError(false);
    setInstrumentSelected(ev.target.value)
  }

  const handleSelectVisibilityChange = (ev) => {
    if (selectVisibilityError) setSelectVisibilityError(false);
    setVisibilitySelected(ev.target.value)
  }

  const handleCreatePartitionClick = async () => {
    if (auth.auth.id !== '0' && partitionName !== '' && instrumentSelected !== '') {
      let partitionInput: PartitionInput = {
        chords: [],
        instrumentId: instrumentSelected,
        name: partitionName,
        ownerId: auth.auth.id,
        content: '',
        visibility: visibilitySelected
     }
     let res;
     try {
       res = await createPartition({ variables: { partitionInput }})
     } catch (err) {
       console.log(err);
       // Notification
       notificationHandler.showNotification('Erreur lors de la création de la partition', 'error')
     }
     console.log(res.data.createPartition.id);
     if (res.data.createPartition.id) {
       console.log(res.data.createPartition.id);
       // Redirection + Notification
       history.replace(PARTITION_LIST_BASE_ROUTE);
       notificationHandler.showNotification('Partition créée', 'success')
     }
    } else {
      // Notification / Input en rouge
      if (instrumentSelected === '') {
        setSelectInstrumentError(true);
      }
      if (partitionName === '') {
        setInputError(true);
      }
      notificationHandler.showNotification('Veuillez renseigner les champs de création de partition', 'warning');
    }
  }
  
  return (
    <div>
      {auth.auth.id === '0' && 
        <div>
          Veuillez vous authentifier ou vous créer un compte pour créer une partition
        </div>
      }
      {auth.auth.id !== '0' && loading === false && error === undefined &&
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
          <Grid item>
            <Paper style={{padding: 10}}>
    
              <Grid container spacing={1} direction="column" alignItems="center">
                <Grid item xs={12}>
                  <TextField error={inputError} value={partitionName} onChange={handleInput} label="Nom de partition"></TextField>
                </Grid>
                <FormControl className={classes.formControl}>
                  <InputLabel>Instrument</InputLabel>
                  <Select error={selectInstrumentError} value={instrumentSelected} onChange={(ev) => handleSelectChange(ev)}>
                    {data.instruments.map(instrument => <MenuItem key={instrument.id} value={instrument.id}>{instrument.name}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel>Visibilité</InputLabel>
                  <Select error={selectVisibilityError} value={visibilitySelected} onChange={(ev) => handleSelectVisibilityChange(ev)}>
                    <MenuItem key={Visibility.PUBLIC} value={Visibility.PUBLIC}>{Visibility.PUBLIC}</MenuItem>
                    <MenuItem key={Visibility.PRIVATE} value={Visibility.PRIVATE}>{Visibility.PRIVATE}</MenuItem>
                  </Select>
                </FormControl>


                <Grid item xs={12}>
                  <Button onClick={() => handleCreatePartitionClick()}>Créer la partition</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      }
      {auth.auth.id !== '0' && loading === true &&
        <div>Loading...</div>
      }
      {auth.auth.id !== '0' && error !== undefined &&
        <div>error</div>
      }
    </div>
    
  )
}
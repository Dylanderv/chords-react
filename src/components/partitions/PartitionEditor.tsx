import React, { useState, useEffect, useContext, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useReactRouter } from '../../hooks/useReactRouter';
import { RouteComponentProps, StaticContext } from 'react-router';
import { TextField, Button, IconButton, Grid, Typography, ListItem, ListItemText, ListItemSecondaryAction, List } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { PartitionInput } from '../chords-viewer/AddToPartitionButton';
import { notificationContext } from '../../contexts/NotificationContext';
import { authContext } from '../../contexts/AuthContext';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { PARTITION_BASE_ROUTE } from '../../utils/routerUtils';
import { ControlledEditor } from "@monaco-editor/react";

const PARTITION_EDITOR_QUERY = (partitionId: string) =>  gql`
{
  partition(id: "${partitionId}") {
    id
    name
    visibility
    owner {
      id
      username
    }
    content
    chords {
      id
      key
      suffix
    }
    instrument {
      id
      name
    }
  }
}
`

const MODIFY_PARTITION = gql`
  mutation ModifyPartition($id: ID!, $partitionInput: PartitionInput!) {
    modifyPartition(id: $id, partitionInput: $partitionInput) {
      id
      name
      chords {
        id
      }
      instrument {
        id
      }
      content
    }
  }
`;

type TParams = { partitionId: string }

const PartitionEditor: React.FC = () => {
  const { match, history } = useReactRouter() as RouteComponentProps<TParams, StaticContext, any>;
  const {loading, data, error} = useQuery(PARTITION_EDITOR_QUERY(match.params.partitionId));
  const [partitionName, setPartitionName] = useState('');
  const [inputError, setInputError] = useState(false);
  const [partitionContent, setPartitionContent] = useState('');
  const [ toDeleteChord, setToDeleteChord ] = useState<string[]>([]);
  const [ modifyPartition, { loading: mutationLoading, error: mutationError } ] = useMutation(MODIFY_PARTITION);
  const notificationHandler = useContext(notificationContext);
  const auth = useContext(authContext);


  const handleInput = (ev) => {
    if (ev.target.value === '' ) {
      setInputError(true);
    } else {
      setInputError(false);
    }
    setPartitionName(ev.target.value)
  }

  useEffect(() => {
    if (data === undefined) return
    setPartitionName(data.partition.name)
    setPartitionContent(data.partition.content)
  }, [data])

  const handleContentChange = (ev, value) => {
    setPartitionContent(value);
  }

  const handleClickButton = async () => {
    let newChords = data.partition.chords.filter(chord => {
      return !toDeleteChord.includes(chord.id)
    })
    let partitionInput: PartitionInput = {
      chords: newChords.map(chord => chord.id),
      content: partitionContent,
      instrumentId: data.partition.instrument.id,
      name: partitionName,
      ownerId: data.partition.owner.id
    }
    let res;
    try {
      res = await modifyPartition({ variables: {id: match.params.partitionId, partitionInput }});
      console.log(res);
      if (res.data !== null) {
        notificationHandler.showNotification("La partition a bien été modifié", 'success');
        history.replace(PARTITION_BASE_ROUTE + '/' + data.partition.id);
      }
    } catch (err) {
      console.log('err', err)
      notificationHandler.showNotification("Erreur lors de la modification de la partition", 'error')
    }

  }

  const handleClickDelete = (chordId: string) => {
    let index = toDeleteChord.findIndex(id => id === chordId);
    if (index === -1) {
      setToDeleteChord([...toDeleteChord, chordId]);
    }
  }

  const handleClickRestore = (chordId: string) => {
    setToDeleteChord(toDeleteChord.filter(id => id !== chordId));
  }

  return (
    <div>
        {auth.auth.id === '0' && 
          <div>
            Veuillez vous authentifier ou vous créer un compte pour modifier une partition
          </div>
        }
        {auth.auth.id !== '0' &&loading === true && <div>Loading...</div>}
        {auth.auth.id !== '0' && loading === false && error === undefined && auth.auth.id === data.partition.owner.id && (
          <Grid container direction="column" alignItems="center" style={{ padding: 15 }} spacing={1}>
            <Grid item>
              <TextField error={inputError} defaultValue={data.partition.name} onChange={handleInput} label="Nom de partition"></TextField>
            </Grid>
            <Grid item>
              <List>
                {data.partition.chords.map(chord => 
                  <div key={chord.id}>
                    {/* Ça serait cool si ça pouvait mettre en barré l'accord et qu'il s'enlève que si on enregistre */}
                    <ListItem>
                      <ListItemText primaryTypographyProps={toDeleteChord.findIndex(id => id === chord.id) !== -1 ? { style: {textDecoration: "line-through"} } : {}}
                        primary={chord.key + chord.suffix}
                      />
                      <ListItemSecondaryAction>
                        {toDeleteChord.findIndex(id => id === chord.id) !== -1 ? 
                          <IconButton onClick={() => handleClickRestore(chord.id)} edge="end" aria-label="delete">
                            <SettingsBackupRestoreIcon fontSize="small" />
                          </IconButton>
                          :
                          <IconButton onClick={() => handleClickDelete(chord.id)} edge="end" aria-label="delete">
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        }
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                )}
              </List>
            </Grid>
            <Grid item>
              {/* <TextField defaultValue={data.partition.content} multiline onChange={handleContentChange}></TextField> */}
              <ControlledEditor
                language="markdown"
                theme="light"
                value={partitionContent}
                options={{ selectOnLineNumbers: true }}
                height="40vh"
                width="50vw"
                onChange={handleContentChange}
              />
            </Grid>
            <Grid item>
              <Button onClick={() => handleClickButton()}>Enregister les modifications</Button>
            </Grid>
          </Grid>
        )}
        {auth.auth.id !== '0' && loading === false && error === undefined && auth.auth.id !== data.partition.owner.id && 
          <div>
            Vous devez être propriétaire de la partition pour pouvoir la modifier
          </div>
        }
        {auth.auth.id === '0' && error !== undefined && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
  )
}

export default PartitionEditor;
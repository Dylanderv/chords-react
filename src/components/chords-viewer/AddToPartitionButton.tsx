import React, { useState, useContext } from 'react';
import { MenuItem, Menu, Button } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { notificationContext } from '../../contexts/NotificationContext';

type addToPartitionButtonProps = { userId: string, chordId: string, instrumentId: string };

const addToPartitionButtonQuery = (userId, instrumentId) => gql`
{
  partitionsFromUserForInstrument(userId: "${userId}", instrumentId: "${instrumentId}") {
    id
    name
    chords {
      id
    }
    instrument {
      id
    }
    owner {
      id
    }
    content
    visibility
  }
}
`

export enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}
export type PartitionInput = { name: string, chords: string[], ownerId: string, instrumentId: string, content: string, visibility: Visibility };

// const addToPartitionMutation = (partitionId: string, partitionInput: PartitionInput) => gql`
// {
//   modifyPartition(id: "${partitionId}", partitionInput: "${partitionInput}") {
//     id
//   }
// }
// `

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

const AddToPartitionButton: React.FC<addToPartitionButtonProps> = ({ userId, chordId, instrumentId }) => {
  const [ anchorEl, setAnchorEl ] = useState(null);
  const { data, loading, error } = useQuery(addToPartitionButtonQuery(userId, instrumentId));
  const [ modifyPartition, { loading: mutationLoading, error: mutationError } ] = useMutation(MODIFY_PARTITION);
  const notificationHandler = useContext(notificationContext);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleClickPartition = async (partition) => {
    let partitionChords = partition.chords.map(chord => chord.id);
    partitionChords.push(chordId);
    let partitionInput: PartitionInput = {
      chords: partitionChords,
      instrumentId: partition.instrument.id,
      name: partition.name,
      ownerId: userId,
      content: partition.content,
      visibility: partition.visibility
    }
    let res;
    try {
      res = await modifyPartition({ variables: { id: partition.id, partitionInput } });
    } catch (err) {
      console.log('err', err)
      notificationHandler.showNotification("Erreur lors de l'ajout de l'accord", 'error')
    }
    if (res.data !== null) {
      notificationHandler.showNotification("L'accord a bien été ajouté", 'success')
    }
    setAnchorEl(null);
  }

  return (
    <div>
      {loading === true && <div>Loading...</div>}
      {mutationLoading === true && <div>Ajout de l'accord en cours</div>}
      {loading === false && error === undefined && mutationLoading === false 
        && mutationError === undefined &&  
      (
        <div>
          <Button onClick={handleClick}>Add to partition</Button>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            {data.partitionsFromUserForInstrument.map(partition => 
              <div key={partition.id}>
                {partition.chords.findIndex(chord => chord.id === chordId) === -1 &&
                  <MenuItem onClick={() => handleClickPartition(partition)}>{partition.name}</MenuItem>
                }
              </div>
            )}
            
          </Menu>
        </div>
      )}
      {mutationError === undefined && <p>{mutationError}</p>}
      {error !== undefined && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  )
}

export default AddToPartitionButton;
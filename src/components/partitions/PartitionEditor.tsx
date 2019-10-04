import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const QUERY = gql`
{
  partitions {
    name
  }
}
`


const PartitionEditor: React.FC = () => {
  const {loading, data, error} = useQuery(QUERY);

  if (loading === false && error === undefined) {
  }

  return (
    <div>
        {loading === true && <div>Loading...</div>}
        {loading === false && error === undefined && (
          <div>WSH</div>
        )}
        {error !== undefined && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
  )
}
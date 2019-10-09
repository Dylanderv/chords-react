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

  if (loading === false && error === undefined) {
    // displayContent(data.partition.content, data.partition.chords, data.partition.instrument.id, data.partition.instrument.name);
  }
  
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
              <Typography variant="body1" display="inline" style={{ fontWeight: "bold" }}>{chord.key + chord.suffix}</Typography>
            </NoBackgroundTooltip>
            
          </div>
          )}
          <div>{displayContent(data.partition.content, data.partition.chords, data.partition.instrument.id, data.partition.instrument.name)}</div>
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

function displayContent(content: string, chordList: {id: string, key: string, suffix: string}[], instrumentId: string, instrumentName: string) {
  let contentList = [content]
  console.log(content);
  chordList.forEach(chord => contentList = occurencesSplitter(contentList, chord.key + chord.suffix));
  console.log(contentList);
  let finalContentList: any[] = [];
  contentList.forEach((contentElem, pos) => {
    let chord = chordList.find(chord => (chord.key + chord.suffix) === contentElem);
    if (chord !== undefined) {
      finalContentList.push(
        <NoBackgroundTooltip key={pos} placement="right-start"
          title={
            <ChordViewer key={chord.id} isInPartition={true}
              instrumentId={instrumentId} instrumentName={instrumentName} mainKey={chord.key} suffix={chord.suffix}
            ></ChordViewer>
          }
        >
          <Typography variant="body1" display="inline" style={{ fontWeight: "bold" }}>{chord.key + chord.suffix}</Typography>
        </NoBackgroundTooltip>
      )
    } else {
      finalContentList.push(<Typography key={pos} variant="body2" display="inline">{contentElem}</Typography>);
    }
  })
  return finalContentList;
}

function occurencesSplitter(contentList: string[], elementToFind: string) {
  let newContentList: string[] = [];
  contentList.forEach((content: string) => {
    let splittedContent = content.split(elementToFind);
    let filledSplittedContent: string[] = [];
    for (let i = 0; i < splittedContent.length; i++) {
      filledSplittedContent.push(splittedContent[i]);
      if (i !== splittedContent.length -1) filledSplittedContent.push(elementToFind);
    }
    newContentList = [...newContentList, ...filledSplittedContent];
  });
  return newContentList;
}

export default PartitionViewer;
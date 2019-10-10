import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useReactRouter } from '../../hooks/useReactRouter';
import { StaticContext, RouteComponentProps } from 'react-router';
import ChordViewer from '../chords-viewer/ChordViewer';
import { Tooltip, withStyles, Theme, Fab, createStyles, Typography, Grid, List, ListItem } from '@material-ui/core';
import { authContext } from '../../contexts/AuthContext';
import { PARTITION_EDITOR_BASE_ROUTE } from '../../utils/routerUtils';
import { makeStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Marked from 'marked';
import Markdown from 'markdown-to-jsx';
import TooltipChord from '../TooltipChord';


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
      <Grid container direction="column" alignItems="center" style={{ padding: 15 }} spacing={1}>
        <Grid item>
          <Typography variant="h3" gutterBottom>{data.partition.name}</Typography>
            {data.partition.chords.map((chord, pos) => 
              <span key={chord.id}>
                <TooltipChord 
                  instrumentName={data.partition.instrument.name} 
                  instrumentId={data.partition.instrument.id} 
                  chordKey={chord.key} chordSuffix={chord.suffix}
                />
                {data.partition.chords.length - 1 > pos && <span> - </span>}
              </span>
            )}
          </Grid>
          <Grid item>
          <Markdown
            children={test(Marked(data.partition.content), data.partition.chords, data.partition.instrument.id, data.partition.instrument.name)}
            options={{
              overrides: {
                TooltipChord
              }
            }}
          />
        </Grid>
        {auth.auth.id !== '0' && auth.auth.id === data.partition.owner.id &&
          <Fab component={Link} to={PARTITION_EDITOR_BASE_ROUTE + '/' + data.partition.id} color='secondary' className={classes.fab}><EditIcon/></Fab>
        }
      </Grid>
      )}
      {error !== undefined && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  )
}

// TODO: Faire la transformation en Markdown coté serveur

function test(content: string, chordList: {id: string, key: string, suffix: string}[], instrumentId: string, instrumentName: string) {
  // console.log('jsx', parser(content));
  let contentList = [content]
  console.log(content);
  chordList.forEach(chord => contentList = occurencesSplitter(contentList, chord.key + chord.suffix));
  console.log(contentList);
  let finalContentList: any[] = [];
  contentList.forEach((contentElem, pos) => {
    let chord = chordList.find(chord => (chord.key + chord.suffix) === contentElem);
    if (chord !== undefined) {
      finalContentList.push(
        `<TooltipChord instrumentName="${instrumentName}" instrumentId="${instrumentId}" chordKey="${chord.key}" chordSuffix="${chord.suffix}"/>`
      )
    } else {
      finalContentList.push(contentElem);
    }
  })
  console.log('lautre', finalContentList.join(''));
  return finalContentList.join('');
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
import React from 'react';
import { createStyles, Theme, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InstrumentType } from '../../model/InstrumentType';
import ChordViewer from '../chords-viewer/ChordViewer';
import { RouteComponentProps, StaticContext } from 'react-router';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import { useReactRouter } from '../../hooks/useReactRouter';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export type TParams = {instrument: string, key: string, suffix: string,}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

type chordSelectorProps = {
  instrumentId: string;
  instrumentName: InstrumentType;
  noViewer: boolean
};

function chordForInstrumentQueryBuilder(instrumentId: string) {
  return gql`
  {
    instrument(id: "${instrumentId}") {
      keys
      suffixes
    }
  }
  `
}

const ChordSelector: React.FC<chordSelectorProps> = ({ instrumentId, instrumentName, noViewer }) => {
  const { error, loading, data } = useQuery(chordForInstrumentQueryBuilder(instrumentId));
  // const service = useChordService((instrumentId + 'ChordName') as 'guitarChordName' | 'ukuleleChordName' | 'pianoChordName') as Service<IPayloadChordName>;
  const router = useReactRouter() as RouteComponentProps<TParams, StaticContext, any>;
  const classes = useStyles();

  let keyParam = router.match.params.key !== undefined ? router.match.params.key : '';
  let suffixParam = router.match.params.suffix !== undefined ? router.match.params.suffix : '';

  // Add instrument + check si c'est le meme qu'en paramètre
  const [values, setValues] = React.useState({
    key: keyParam,
    suffix: suffixParam,
  });

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name as string]: event.target.value,
    }));
    if (noViewer) return
    let pathToGo = [
      CHORD_VIEWER_BASE_ROUTE,
      instrumentName,
      event.target.name === 'key' ? event.target.value : values.key,
      event.target.name === 'suffix' ? event.target.value : values.suffix
    ];
    router.history.replace(pathToGo.join('/'));
  };

  let keys: string[] = [];
  let suffixes: string[] = [];

  if (loading === false && error === undefined) {
    keys = data.instrument.keys;
    suffixes = data.instrument.suffixes;
  }

  return (
    <div>
      {loading === true && <div>Loading...</div>}
      {loading === false && error === undefined && (
      <div>
        <Grid container spacing={0} direction="column" alignItems="center">

          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-helper">Main Chord</InputLabel>
              <Select value={values.key} onChange={handleChange} inputProps={{ name: 'key' }}>
                {keys.map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-helper">Suffix</InputLabel>
              <Select value={values.suffix} onChange={handleChange} inputProps={{ name: 'suffix' }}>
                {suffixes.map(suffix => <MenuItem key={suffix} value={suffix}>{suffix}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          {noViewer === false && values.key !== '' && values.suffix !== '' && values.key !== undefined ? 
            <Grid item xs={12}>
              <ChordViewer isInPartition={false} instrumentId={instrumentId} instrumentName={instrumentName} mainKey={values.key} suffix={values.suffix}></ChordViewer>
            </Grid> 
            : <div></div>
          }
          

        </Grid> 
        
        
      </div>
      )}
      {error !== undefined && (
        <div>Error, the backend moved to the dark side: {error}</div>
      )}
    </div>
  )
}

export default ChordSelector;
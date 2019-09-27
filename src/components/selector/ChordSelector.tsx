import React from 'react';
import { createStyles, Theme, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InstrumentType } from '../../model/InstrumentType';
import useChordService from '../../hooks/useChordService';
import { Service } from '../../model/Service';
import { IPayloadChordName } from '../../model/IPayloadChordInstrumentList';
import ChordViewer from '../chords-viewer/ChordViewer';
import { Router, Route, RouteComponentProps, StaticContext } from 'react-router';
import { CHORD_VIEWER_BASE_ROUTE } from '../../utils/routerUtils';
import { useReactRouter } from '../../hooks/useReactRouter';


export type TParams = {instrument: InstrumentType, mainChord: string, suffix: string}

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
  instrument: InstrumentType
};

const ChordSelector: React.FC<chordSelectorProps> = ({ instrument }) => {
  const service = useChordService((instrument + 'ChordName') as 'guitarChordName' | 'ukuleleChordName' | 'pianoChordName') as Service<IPayloadChordName>;
  const router = useReactRouter() as RouteComponentProps<TParams, StaticContext, any>;
  const classes = useStyles();

  let mainChordParam = router.match.params.mainChord !== undefined ? router.match.params.mainChord : '';
  let suffixParam = router.match.params.suffix !== undefined ? router.match.params.suffix : '';


  // Add instrument + check si c'est le meme qu'en paramètre
  const [values, setValues] = React.useState({
    mainChord: mainChordParam,
    suffix: suffixParam,
  });


  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name as string]: event.target.value,
    }));
    let pathToGo = [
      CHORD_VIEWER_BASE_ROUTE,
      instrument,
      event.target.name === 'mainChord' ? event.target.value : values.mainChord,
      event.target.name === 'suffix' ? event.target.value : values.suffix
    ];
    router.history.replace(pathToGo.join('/'));
  };

  let mainChords: string[] = [];
  let suffixes: string[] = [];

  if (service.status === 'loaded') {
    mainChords = service.payload.data.main;
    suffixes = service.payload.data.suffixes
  }

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && (
      <div>
        <Grid container spacing={0} direction="column" alignItems="center">

          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-helper">Main Chord</InputLabel>
              <Select value={values.mainChord} onChange={handleChange} inputProps={{ name: 'mainChord' }}>
                {mainChords.map(mainChord => <MenuItem key={mainChord} value={mainChord}>{mainChord}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-helper">Suffix</InputLabel>
              <Select value={values.suffix} onChange={handleChange} inputProps={{ name: 'suffix' }}>
                {suffixes.map(suffix => <MenuItem key={suffix} value={suffix}>{suffix}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          {values.mainChord !== '' && values.suffix !== '' ? 
            <Grid item xs={12}>
              <ChordViewer instrument={instrument} mainChord={values.mainChord} suffix={values.suffix}></ChordViewer>
            </Grid> 
            : <div></div>
          }
          

        </Grid> 
        
        
      </div>
      )}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  )
}

export default ChordSelector;
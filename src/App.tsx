import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { CHORD_VIEWER_BASE_ROUTE } from './utils/routerUtils';
import 'typeface-roboto';
import InstrumentSelector from './components/selector/InstrumentSelector';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Chords
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Router>
        <Link to={CHORD_VIEWER_BASE_ROUTE}>Chord Viewer</Link>
        <Route path={CHORD_VIEWER_BASE_ROUTE + "/:instrument?/:mainChord?/:suffix?"} component={InstrumentSelector}/>
      </Router>

    </div>
  );
}

export default App;

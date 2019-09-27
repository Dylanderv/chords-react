import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { CHORD_VIEWER_BASE_ROUTE } from './utils/routerUtils';
import 'typeface-roboto';
import InstrumentSelector from './components/selector/InstrumentSelector';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Theme, createStyles, ButtonGroup } from '@material-ui/core';
import Login from './components/Login';
import { useReactRouter } from './hooks/useReactRouter';

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
  // const router = useReactRouter();
  const classes = useStyles();
  // console.log(router)
  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Chords
            </Typography>
            <ButtonGroup aria-label="outlined button group">
              <Button component={Link} to={CHORD_VIEWER_BASE_ROUTE} color="inherit">Chord</Button>
              <Button component={Link} to='/login' color="inherit">Login</Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
        <Route path={CHORD_VIEWER_BASE_ROUTE + "/:instrument?/:mainChord?/:suffix?"} component={InstrumentSelector}/>
        <Route path={'/login'} component={Login}/>
      </Router>

    </div>
  );
}

export default App;

import React, { SyntheticEvent } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { CHORD_VIEWER_BASE_ROUTE } from '../utils/routerUtils';
import InstrumentSelector from './selector/InstrumentSelector';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Theme, createStyles, ButtonGroup, Snackbar } from '@material-ui/core';
import Login from './Login';
import { authContext } from '../contexts/AuthContext';
import MySnackbarContentWrapper, { NotificationType } from './MySnackbarContentWrapper';
import useNotificationHandler from '../hooks/useNotificationHandler';
import { notificationContext } from '../contexts/NotificationContext';

// Use context https://medium.com/hackernoon/learn-react-hooks-by-building-an-auth-based-to-do-app-c2d143928b0b

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
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

const MainComponent: React.FC = () => {
  const classes = useStyles();
  const auth = React.useContext(authContext);
  const notificationHandler = React.useContext(notificationContext);

  const handleClick = (message: string, type: NotificationType) => {
    notificationHandler.showNotification(message, type)
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    notificationHandler.closeNotification();
  };

  return (
    <div className={classes.root}>

      <Button variant="outlined" className={classes.margin} onClick={() => handleClick('test', 'error')}>
        Open success snackbar
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={notificationHandler.notification.message !== undefined}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={notificationHandler.notification.type}
          message={notificationHandler.notification.message}
        />
      </Snackbar>



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

  )
}

export default MainComponent;

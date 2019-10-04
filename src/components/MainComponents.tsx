import React, { SyntheticEvent, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { CHORD_VIEWER_BASE_ROUTE, PARTITION_LIST_BASE_ROUTE, NEW_PARTITION_BASE_ROUTE } from '../utils/routerUtils';
import InstrumentSelector from './selector/InstrumentSelector';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles, Theme, createStyles, ButtonGroup, Snackbar, Drawer, ListItem, List, ListItemIcon, ListItemText } from '@material-ui/core';
import Login, { handleLogOutButtonClick } from './Login';
import { authContext } from '../contexts/AuthContext';
import MySnackbarContentWrapper, { NotificationType } from './MySnackbarContentWrapper';
import useNotificationHandler from '../hooks/useNotificationHandler';
import { notificationContext } from '../contexts/NotificationContext';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { PartitionList } from './partitions/PartitionList';
import { NewPartitionEditor } from './partitions/NewPartitionEditor';

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
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  }),
);

type mainComponentProps = {onToggleDark}

const MainComponent: React.FC<mainComponentProps> = ({ onToggleDark }) => {
  const classes = useStyles();
  const auth = React.useContext(authContext);
  const notificationHandler = React.useContext(notificationContext);
  const [drawer, setDrawer] = useState(false);
  
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    notificationHandler.closeNotification();
  };

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawer(open);
  };

  return (
    <div className={classes.root}>
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
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Chords
            </Typography>
            <ButtonGroup aria-label="outlined button group">
              <Button component={Link} to={CHORD_VIEWER_BASE_ROUTE} color="inherit">Chord</Button>
              <Button component={Link} to={PARTITION_LIST_BASE_ROUTE} color="inherit">Paritions</Button>
              {auth.auth.id === 0 ? 
                <Button component={Link} to='/login' color="inherit">Login</Button>
                :
                <Button onClick={async () => await handleLogOutButtonClick(notificationHandler, auth)} color="inherit">Logout</Button>
              }
            </ButtonGroup>
          </Toolbar>
        </AppBar>
        <Drawer open={drawer} onClose={toggleDrawer(false)}>
          <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button key='theme' onClick={onToggleDark}>
                <ListItemIcon><InvertColorsIcon/></ListItemIcon>
                <ListItemText primary='Dark/Light' />
              </ListItem>
            </List>
          </div>
        </Drawer>
        
        <Route path={CHORD_VIEWER_BASE_ROUTE + "/:instrument?/:key?/:suffix?"} render={() => <InstrumentSelector noViewer={false}></InstrumentSelector>}/>
        <Route exact path={PARTITION_LIST_BASE_ROUTE} component={PartitionList}/>
        <Route exact path={PARTITION_LIST_BASE_ROUTE + '/new'} component={NewPartitionEditor}/>
        <Route path={'/login'} component={Login}/>
      </Router>
    </div>

  )
}

export default MainComponent;

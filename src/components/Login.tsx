import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, createStyles, Theme, SnackbarContent, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import { authenticate, register, isAuth, logOut } from '../services/loginService';
import { red, green } from '@material-ui/core/colors';
import { authContext, IAuthContextInterface } from '../contexts/AuthContext';
import useNotificationHandler from '../hooks/useNotificationHandler';
import { UserAuth } from '../model/UserAuth';
import { useReactRouter } from '../hooks/useReactRouter';
import { notificationContext, INotificationContextInterface } from '../contexts/NotificationContext';

const ERROR_400_AUTH = 'Requête invalide'
const ERROR_401_AUTH = 'Nom de compte ou mot de passe incorrect'
const ERROR_403_AUTH = 'Vous êtes déjà connecté'
const ERROR_OTHER_AUTH = 'Erreur serveur inconnue'
const ERROR_400_REGISTER = 'Requête invalide'
const ERROR_401_REGISTER = `Nom d'utilisateur déjà utilisé`
const ERROR_403_REGISTER = 'Vous êtes déjà connecté'
const ERROR_OTHER_REGISTER = 'Erreur serveur inconnue'
const ERROR_OTHER_ISAUTH = 'Erreur serveur inconnue'
const ERROR_401_LOGOUT = `Vous n'êtes pas connecté`
const ERROR_OTHER_LOGOUT = 'Erreur serveur inconnue'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      backgroundColor: red[700]
    },
    success: {
      backgroundColor: green[700]
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  })
)

const Login: React.FC = () => {
  const classes = useStyles();
  const { history } = useReactRouter();
  const auth = React.useContext(authContext);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const notificationHandler = React.useContext(notificationContext);

  const handleLoginButtonClick = async () => {
    try {
      let userData = await authenticate(usernameInput, passwordInput);
      notificationHandler.showNotification('Vous êtes bien authentifié', 'success');
      const { id, username }: UserAuth = userData;
      auth.setAuthStatus({ id, username });
      history.replace('/');
    } catch (err) {
      if (err.code === 400) {
        // Requête invalide
        notificationHandler.showNotification(ERROR_400_AUTH, 'error')
      } else if (err.code === 401) {
        // Nom de compte ou mot de pass incorrect
        notificationHandler.showNotification(ERROR_401_AUTH, 'error')
      } else if (err.code === 403) {
        // Vous ếtes déjà connecté
        notificationHandler.showNotification(ERROR_403_AUTH, 'error')
      } else {
        // Erreur serveur inconnue
        notificationHandler.showNotification(ERROR_OTHER_AUTH, 'error')
      }
    }
  };

  const handleRegisterButtonClick = async () => {
    try {
      await register(usernameInput, passwordInput);
      notificationHandler.showNotification('Vous êtes bien enregistré', 'success');
    } catch (err) {
      if (err.code === 400) {
        // Requête invalide
        notificationHandler.showNotification(ERROR_400_REGISTER, 'error')
      } else if (err.code === 401) {
        // Nom utilisateur déja utilisé
        notificationHandler.showNotification(ERROR_401_REGISTER, 'error')
      } else if (err.code === 403) {
        // Vous ếtes déjà connecté
        notificationHandler.showNotification(ERROR_403_REGISTER, 'error')
      } else {
        // Erreur serveur inconnue
        notificationHandler.showNotification(ERROR_OTHER_REGISTER, 'error')
      }
    }
  };

  const handleIsAuthButtonClick = async () => {
    try {
      let res = await isAuth()
      notificationHandler.showNotification(`Vous êtes ${res ? 'connecté' : 'déconnecté'}`, 'info');
    } catch (err) {
      // erreur serveur inconnu (erreur réseau)
      notificationHandler.showNotification(ERROR_OTHER_ISAUTH, 'error');
    }
  };

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
      <Grid item>
        <Paper style={{padding: 10}}>

          <Grid container spacing={1} direction="column" alignItems="center">
            <Grid item xs={12}>
              <TextField value={usernameInput} onChange={(ev) => setUsernameInput(ev.target.value)} label="Nom de compte"></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField value={passwordInput} onChange={(ev) => setPasswordInput(ev.target.value)} label="Mot de passe"></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleLoginButtonClick}>Login</Button>
              <Button onClick={handleRegisterButtonClick}>Register</Button>
              <Button onClick={handleIsAuthButtonClick}>Is Authenticated</Button>
              <Button onClick={() => handleLogOutButtonClick(notificationHandler, auth)}>Logout</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export const handleLogOutButtonClick = async (notificationHandler: INotificationContextInterface, auth: IAuthContextInterface) => {
  try {
    await logOut()
    notificationHandler.showNotification('Vous êtes bien déconnecté', 'success');
    auth.setUnauthStatus();
  } catch (err) {
    if (err.code === 401) {
      // Vous n'êtes pas connecté
      notificationHandler.showNotification(ERROR_401_LOGOUT, 'error')
    } else {
      // erreur serveur inconnue
      notificationHandler.showNotification(ERROR_OTHER_LOGOUT, 'error')
    }
  }
};

export default Login;
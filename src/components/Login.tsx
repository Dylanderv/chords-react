import React, { useState, SyntheticEvent } from 'react';
import { TextField, Button, Grid, Paper, createStyles, Theme, SnackbarContent, IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import { authenticate, register, isAuth, logOut } from '../services/loginService';
import { FetchError } from '../model/FetchError';
import { red, green } from '@material-ui/core/colors';

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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [snackbarErrorContent, setSnackbarErrorContent] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [snackbarSuccessContent, setSnackbarSuccessContent] = useState('');

  const handleLoginButtonClick = async () => {
    try {
      await authenticate(username, password);
      setSnackbarSuccessContent('Vous êtes bien authentifié');
      setOpenSuccessSnackbar(true);
    } catch (err) {
      if (err.code === 400) {
        // Requête invalide
        setSnackbarErrorContent(ERROR_400_AUTH)
      } else if (err.code === 401) {
        // Nom de compte ou mot de pass incorrect
        setSnackbarErrorContent(ERROR_401_AUTH)
      } else if (err.code === 403) {
        // Vous ếtes déjà connecté
        setSnackbarErrorContent(ERROR_403_AUTH)
      } else {
        // Erreur serveur inconnue
        setSnackbarErrorContent(ERROR_OTHER_AUTH)
      }
      setOpenErrorSnackbar(true);
    }
  };

  const handleRegisterButtonClick = async () => {
    try {
      await register(username, password);
      setSnackbarSuccessContent('Vous êtes bien enregistré');
      setOpenSuccessSnackbar(true);
    } catch (err) {
      if (err.code === 400) {
        // Requête invalide
        setSnackbarErrorContent(ERROR_400_REGISTER)
      } else if (err.code === 401) {
        // Nom utilisateur déja utilisé
        setSnackbarErrorContent(ERROR_401_REGISTER)
      } else if (err.code === 403) {
        // Vous ếtes déjà connecté
        setSnackbarErrorContent(ERROR_403_REGISTER)
      } else {
        // Erreur serveur inconnue
        setSnackbarErrorContent(ERROR_OTHER_REGISTER)
      }
      setOpenErrorSnackbar(true);
    }
  };

  const handleIsAuthButtonClick = async () => {
    try {
      let res = await isAuth()
      setSnackbarSuccessContent(`Vous êtes ${res ? 'connecté' : 'déconnecté'}`);
      setOpenSuccessSnackbar(true);
    } catch (err) {
      // erreur serveur inconnu (erreur réseau)
      setSnackbarErrorContent(ERROR_OTHER_ISAUTH)
      setOpenErrorSnackbar(true);
    }
  };

  const handleLogOutButtonClick = async () => {
    try {
      await logOut()
      setSnackbarSuccessContent('Vous êtes bien déconnecté');
      setOpenSuccessSnackbar(true);
    } catch (err) {
      if (err.code === 401) {
        // Vous n'êtes pas connecté
        setSnackbarErrorContent(ERROR_401_LOGOUT)
      } else {
        // erreur serveur inconnue
        setSnackbarErrorContent(ERROR_OTHER_LOGOUT)
      }
      setOpenErrorSnackbar(true);
    }
  };

  const handleAccountNameChange = (ev) => {
    setUsername(ev.target.value);
  };

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
    setSnackbarErrorContent('');
  };

  const handleCloseSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
    setSnackbarSuccessContent('');
  };

  

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
      <Grid item>
        <Paper style={{padding: 10}}>

        <Snackbar open={openErrorSnackbar}>
            <SnackbarContent
              className={classes.error}
              aria-describedby="client-snackbar"
              message={
                <span id="client-snackbar" className={classes.message}>
                  {snackbarErrorContent}
                </span>
              }
              action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={handleCloseErrorSnackbar}>
                  <CloseIcon/>
                </IconButton>,
              ]}
            />
          </Snackbar>

          <Snackbar open={openSuccessSnackbar}>
            <SnackbarContent
              className={classes.success}
              aria-describedby="client-snackbar"
              message={
                <span id="client-snackbar" className={classes.message}>
                  {snackbarSuccessContent}
                </span>
              }
              action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={handleCloseSuccessSnackbar}>
                  <CloseIcon/>
                </IconButton>,
              ]}
            />
          </Snackbar>

          <Grid container spacing={1} direction="column" alignItems="center">
            <Grid item xs={12}>
              <TextField value={username} onChange={handleAccountNameChange} label="Nom de compte"></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField value={password} onChange={handlePasswordChange} label="Mot de passe"></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleLoginButtonClick}>Login</Button>
              <Button onClick={handleRegisterButtonClick}>Register</Button>
              <Button onClick={handleIsAuthButtonClick}>Is Authenticated</Button>
              <Button onClick={handleLogOutButtonClick}>Logout</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Login;
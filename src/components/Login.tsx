import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { authenticate } from '../services/loginService';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3)
    }
  })
)

const Login: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginButtonClick = () => {
    console.log(username);
    console.log(password);
    authenticate(username, password);
  }

  const handleAccountNameChange = (ev) => {
    setUsername(ev.target.value);
  }

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  }

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
      <Grid item>
        <Paper style={{padding: 10}}>
          <Grid container spacing={1} direction="column" alignItems="center">
            <Grid item xs={12}>
              <TextField value={username} onChange={handleAccountNameChange} label="Nom de compte"></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField value={password} onChange={handlePasswordChange} label="Mot de passe"></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleLoginButtonClick}>Login</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Login;
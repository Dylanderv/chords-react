import React, { useState } from 'react';
import './App.css';
import 'typeface-roboto';
import AuthProvider from './contexts/AuthContext';
import MainComponent from './components/MainComponents';
import NotificationProvider from './contexts/NotificationContext';
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost';
import { ENDPOINT } from './utils/consts';
import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

export const client  = new ApolloClient({
  uri: ENDPOINT + 'graphql'
})



// Use context https://medium.com/hackernoon/learn-react-hooks-by-building-an-auth-based-to-do-app-c2d143928b0b

const App: React.FC = () => {

  let localStorageTheme = window.localStorage.getItem('theme');
  let defaultTheme = localStorageTheme !== null ?
    JSON.parse(localStorageTheme)
    :
    {
      palette: {
        type: 'light',
      }
    };

  const [theme, setTheme] = useState<{palette: {type: "light" | "dark" | undefined}}>(defaultTheme);



  const toggleDarkTheme = () => {
    setTheme({
      palette: {
        type: (theme.palette.type === 'light' ? 'dark' : 'light'),
      }
    })
    window.localStorage.setItem("theme", JSON.stringify({
      palette: {
        type: (theme.palette.type === 'light' ? 'dark' : 'light'),
      }
    }));
  }

  const muiTheme = createMuiTheme(theme);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NotificationProvider>
          <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <MainComponent onToggleDark={toggleDarkTheme}></MainComponent>
          </MuiThemeProvider>
        </NotificationProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

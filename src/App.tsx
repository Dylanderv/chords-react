import React from 'react';
import './App.css';
import 'typeface-roboto';
import AuthProvider from './contexts/AuthContext';
import MainComponent from './components/MainComponents';
import NotificationProvider from './contexts/NotificationContext';
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost';
import { ENDPOINT } from './utils/consts';

export const client  = new ApolloClient({
  uri: ENDPOINT + 'graphql'
})

// Use context https://medium.com/hackernoon/learn-react-hooks-by-building-an-auth-based-to-do-app-c2d143928b0b

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NotificationProvider>
          <MainComponent></MainComponent>
        </NotificationProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

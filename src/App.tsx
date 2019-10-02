import React from 'react';
import './App.css';
import 'typeface-roboto';
import AuthProvider from './contexts/AuthContext';
import MainComponent from './components/MainComponents';
import NotificationProvider from './contexts/NotificationContext';

// Use context https://medium.com/hackernoon/learn-react-hooks-by-building-an-auth-based-to-do-app-c2d143928b0b

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <MainComponent></MainComponent>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;

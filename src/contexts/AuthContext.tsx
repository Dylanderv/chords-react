import React from 'react';
import { UserAuth } from '../model/UserAuth';
import { DEFAULT_USER_AUTH } from '../utils/consts';
import useAuthHandler from '../hooks/AuthHandler';
import { getStoredUserAuth } from '../utils/authUtils';

export interface IAuthContextInterface {
  auth: UserAuth;
  setAuthStatus: (userAuth: UserAuth) => void;
  setUnauthStatus: () => void;
}

export const authContext =
  React.createContext<IAuthContextInterface>({
    auth: DEFAULT_USER_AUTH,
    setAuthStatus: () => {},
    setUnauthStatus: () => {}
  })

const { Provider } = authContext;

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, setAuthStatus, setUnauthStatus } = useAuthHandler( getStoredUserAuth() );

  return (
    <Provider value={{ auth, setAuthStatus, setUnauthStatus }}>
      {children}
    </Provider>
  );

};

export default AuthProvider;

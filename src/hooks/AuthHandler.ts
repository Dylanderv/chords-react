import React from 'react';
import { UserAuth } from '../model/UserAuth';
import { DEFAULT_USER_AUTH } from '../utils/consts';

const useAuthHandler = (initialState: UserAuth) => {
  const [auth, setAuth] = React.useState(initialState);

  const setAuthStatus = (userAuth: UserAuth) => {
    window.localStorage.setItem("UserAuth", JSON.stringify(userAuth));
    setAuth(userAuth);
  };

  const setUnauthStatus = () => {
    window.localStorage.clear();
    setAuth(DEFAULT_USER_AUTH);
  };

  return {
    auth,
    setAuthStatus,
    setUnauthStatus
  };
};

export default useAuthHandler;
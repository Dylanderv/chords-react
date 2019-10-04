import React from 'react';
import { UserAuth, InputUserAuth } from '../model/UserAuth';
import { DEFAULT_USER_AUTH } from '../utils/consts';
import { getDatePlusOneHour } from '../utils/authUtils';

const useAuthHandler = (initialState: UserAuth) => {
  const [auth, setAuth] = React.useState(initialState);

  const setAuthStatus = (inputUserAuth: InputUserAuth) => {
    // TODO: Add cookie time (1h)
    let userAuth: UserAuth = {
      expire: getDatePlusOneHour(),
      ...inputUserAuth
    }
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
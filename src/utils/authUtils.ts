import { UserAuth } from "../model/UserAuth";
import { DEFAULT_USER_AUTH } from "./consts";

export const getStoredUserAuth = (): UserAuth => {
  // TODO: Attnetion si le cookie n'est plus valide
  // TODO: Check cookie time
  const jsonAuth = window.localStorage.getItem("UserAuth");
  if (jsonAuth) {
    let auth = JSON.parse(jsonAuth);
    auth.expire = new Date(auth.expire)
    console.log(auth);
    console.log(auth.expire.valueOf());
    console.log(Date.now())
    console.log(auth.expire.valueOf() - Date.now())
    if (auth.expire.valueOf() > Date.now()) {
      return auth;
    }
  }
  return DEFAULT_USER_AUTH;
}

export const getDatePlusOneHour = (): Date => {
  return new Date(Date.now() + 1 * 60 * 60 * 1000);
}

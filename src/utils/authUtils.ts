import { UserAuth } from "../model/UserAuth";
import { DEFAULT_USER_AUTH } from "./consts";

export const getStoredUserAuth = (): UserAuth => {
  const auth = window.localStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }
  return DEFAULT_USER_AUTH;
}
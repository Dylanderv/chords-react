import { UserAuth } from "../model/UserAuth";
import { Notification } from "../model/Notification";

export const DEFAULT_USER_AUTH: UserAuth = {id: 0, username: ''};

export const DEFAULT_NOTIFICATION: Notification = {message: undefined, type: 'info'};

export const ENDPOINT = 'http://localhost:3333/';

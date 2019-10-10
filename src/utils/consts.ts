import { UserAuth } from "../model/UserAuth";
import { Notification } from "../model/Notification";

export const DEFAULT_USER_AUTH: UserAuth = {id: '0', username: '', expire: new Date(0)};

export const DEFAULT_NOTIFICATION: Notification = {message: undefined, type: 'info'};

export const ENDPOINT = 'https://chord-server.herokuapp.com/';


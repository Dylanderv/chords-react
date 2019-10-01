import { ENDPOINT, fetchHandler } from "../utils/fetchUtils";

export async function authenticate(username: string, password: string) {
  let body = new URLSearchParams([ ['username', username], ['password', password]]);
  let url = new URL(ENDPOINT + 'auth/login/')
  let fetchRes = await fetchHandler(url, 'post', undefined, body)
  console.log(fetchRes);
}

export async function register(username: string, password: string) {
  let body = new URLSearchParams([ ['username', username], ['password', password]]);
  let url = new URL(ENDPOINT + 'auth/register')
  let fetchRes = await fetchHandler(url, 'post', undefined, body)
  console.log(fetchRes);
}

export async function isAuth() {
  let url = new URL(ENDPOINT + 'auth/isauth')
  let fetchRes = await fetchHandler(url, 'get')
  console.log(fetchRes);
}

export async function logOut() {
  let url = new URL(ENDPOINT + 'auth/logout')
  let fetchRes = await fetchHandler(url, 'get')
  console.log(fetchRes);
}

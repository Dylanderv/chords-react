import { FetchError } from "../model/FetchError";

type FetchMethods = 'get' | 'post' | 'put' | 'delete';

export function fetchBuilder(url: URL, method: FetchMethods, headers?: Headers, body?) {
  let fetchHeaders = new Headers();
  if (headers) {
    headers.forEach((value, key) => {
      fetchHeaders.append(key, value);
    });
  }
  return fetch(url.toString(), {
    method: method,
    cache: "no-cache",
    mode: "cors",
    headers: fetchHeaders,
    body: body,
    credentials: 'include'
  });
}

export async function fetchHandler(url: URL, method: FetchMethods, headers?: Headers, body?) {
  let response: Response;
  try {
    response = await fetchBuilder(url, method, headers, body);
    let resJson;
    try {
      resJson = await response.json();
    } catch (err) {
      if (!response.ok) {
        throw new FetchError(response.status, response.statusText);
      } else {
        return true;
      }
    }
    if (!response.ok) {
      throw new FetchError(response.status, response.statusText);
    } else {
      return resJson;
    }
  } catch (err) {
    throw err;
  }
}
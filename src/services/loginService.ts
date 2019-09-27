const ENDPOINT = 'http://localhost:3333/'

export async function authenticate(username: string, password: string) {
  let fetchRes;
  try {
    fetchRes = await fetch(ENDPOINT + 'auth/login', {
      mode: 'cors',
      method: 'post',
      body: `{username: ${username}, password: ${password}}`
    });
    console.log(fetchRes);
  } catch (err) {
    console.log(err);
  }
  try {
    console.log(await fetchRes.json());
  } catch(err) {
    console.log(err);
  }
}
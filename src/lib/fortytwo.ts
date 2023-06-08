// lib to auth and retrieve information from the API

const baseUrl = 'https://api.intra.42.fr/';

const authForm = (client_id: string, client_secret: string) => {
  const form = new FormData();
  form.append('grant_type', 'client_credentials');
  form.append('client_id', client_id);
  form.append('client_secret', client_secret);
  return form;
};

async function fetchToken(client_id: string, client_secret: string) {
  const response = await fetch(`${baseUrl}/oauth/token`, {
    method: 'POST',
    body: authForm(client_id, client_secret),
  });
  const data = await response.json();

  return data.access_token;
}

async function fetchAppInfo(token: string) {
  const restwo = await fetch(`${baseUrl}/v2/me`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return {
    appId: restwo.headers.get('x-application-id'),
    appRoles: restwo.headers.get('x-application-roles'),
    appName: restwo.headers.get('x-application-name'),
  };
}

export { fetchToken, fetchAppInfo };

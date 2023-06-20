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
  return data;
}

async function fetchAppInfo({
  access_token,
  secret_valid_until,
}: {
  access_token: string;
  secret_valid_until: number;
}) {
  const restwo = await fetch(`${baseUrl}/v2/me`, {
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  });

  console.log(access_token);
  console.log(secret_valid_until);

  return {
    appId: restwo.headers.get('x-application-id'),
    appRoles: restwo.headers.get('x-application-roles'),
    appName: restwo.headers.get('x-application-name'),
    secret_valid_until: secret_valid_until,
  };
}

export { fetchToken, fetchAppInfo };

// lib to auth and retrieve information from the API

const baseUrl = 'https://api.intra.42.fr/';

const authForm = () => {
  const form = new FormData();
  form.append('grant_type', 'client_credentials');
  form.append('client_id', process.env.CLIENT_ID);
  form.append('client_secret', process.env.CLIENT_SECRET);
  return form;
};

async function fetchToken() {
  console.log(authForm());
  const response = await fetch(`${baseUrl}/oauth/token`, {
    method: 'POST',
    body: authForm(),
  });
  const data = await response.json();
  console.log(response.headers);
  console.log(data);

  const restwo = await fetch(`${baseUrl}/v2/me`, {
    headers: {
      Authorization: 'Bearer ' + data.access_token,
    },
  });

  console.log(restwo.headers);
  console.log(restwo.headers.get('x-application-id'));
  console.log(restwo.headers.get('x-application-roles'));
  console.log(restwo.headers.get('x-application-name'));

  return data;
}

export { fetchToken };

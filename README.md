<p align="center">
    <a href="https://www.hive.fi/" target="_blank">
        <img src="https://github.com/hivehelsinki/.github/blob/main/assets/logo.png?raw=true" width="128" alt="Hive logo" />
    </a>
</p>

<p align="center">
  <sub>Created by <a href="https://github.com/titus">Jordane Gengo (titus)</a></sub>
</p>

## About Hive Keychain

`Hive Keychain` has been crafted for schools within the 42network, but its benefits extend to students developing tools with the 42API.

Since July 2022, 42 implemented a rotation of API application secrets, enhancing security. However, this enhancement also poses a potential pitfall for your services. To ensure streamlined management of your applications, we introduce this monitoring and alerting tool. By adding your keys, you'll receive notifications and reports regarding key expiration or malfunction.

Moreover, this app addresses another common challenge: the ownership of keys by individual team members. By consolidating all your team's keys in one accessible platform, you can avoid the surprise of an imminent key expiration while a team member is on vacation, for example.

<br>

<div align='center'>

![screen dashboard dark](.github/docs/screen00.png?raw=true "Dashboard dark")

_Dashboard dark theme_

<br>

![screen dashboard light](.github/docs/screen01.png?raw=true "Dashboard light")

_Dashboard light theme_

<br>
</div>

## Features

- [x] Send Slack notifications when an app is not valid.
- [x] Send Slack notifications when an app is about to expire (24 hours, 7 days, 14 days).
- [x] Update the saved expiration date if it changes.
- [x] Allows to send notifications via Discord
- [ ] Allows to send notifications via email

## Requirements

This app is developed to run with the 42 OAuth. You will first need to create a 42 API app in the intranet.

**Instructions**

1. Generate a new API application on the [42 intranet](https://profile.intra.42.fr/oauth/applications/new)
2. In the field Redirect URI add: http://localhost:4001/api/auth/callback/42-school
3. From the available scopes, choose "Access the user public data" and then proceed to submit.
4. Save the credentials, you will need them later.

<br/><br/>

## Getting Started

> [!NOTE]<br> We recommend using the Docker setup as it's easier and more straightforward.<br> You will need a running PostgreSQL instance to run the app.

Clone the repository locally

```sh
git clone git@github.com:hivehelsinki/42-api-keychain keychain
cd keychain
```

Copy and fill in the information in `front/.env` to run the frontend app.

```sh
cp front/.env.sample front/.env
vim .env
```

Copy and fill in the information in `back/.env` to run the backend app.

```sh
cp back/.env.sample back/.env
vim .env
```

Install the dependencies, navigate to the root directory and execute the following command:

```sh
npm run install
```

To run the app, navigate to the root directory and execute the following command:

```sh
npm run dev
```

Now you can access you application on [localhost:4001](http://localhost:4001)

<br/><br/>

## Running with Docker

Clone the repository locally

```sh
git clone git@github.com:hivehelsinki/42-api-keychain keychain
cd keychain
```

Run the helper script to setup your .env file and follow the instructions

```
./install.sh
```

Run the containers

```
docker compose up --build
```

Now you can access you application on [localhost:4001](http://localhost:4001)

<br/><br/>

## FAQ

**How often it checks the keys and how to change it?**

The keys are checked every day at 10am. To adjust this schedule, you can modify the time or frequency within the `back/tasks/scheduled-check.js` file. However, I strongly recommend against changing the frequency. The code in the backend is not optimally structured for altering the frequency, and doing so could potentially lead to additional notifications or even missed notifications.

**The Keychain's secret rotated, how can I update the secret?**

To update the API secret for the app, edit the .env file and replace the existing FT_SECRET entry with the new secret, and then reload the container using the command docker-compose down && docker-compose up -d to apply the changes.

**I'm a student and I want to use Keychain, how does that work?**

Please note that if you intend to run this application as a student, you'll need to edit the file `front/src/lib/auth.ts`. In this file, you should replace the section responsible for verifying the user's staff status with a check based on your
login credentials.

**I updated my secret but it keeps showing the old expiration, what's wrong?**

1. Are you sure you are using the new secret and not the old one?
2. If your new secret is valid but didn't rotate yet on the intranet it will keep displaying the old secret expiration. You need to go to the intranet page of your API app and click "Change now".

<br/><br/>

## GDPR

The application doesn't store any information that falls under GDPR regulations.

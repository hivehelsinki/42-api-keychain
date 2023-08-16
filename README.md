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

**Screenshots:**

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
- [ ] Allows to send notifications on Discord instead of Slack

## Requirements

This app is developed to run with the 42 OAuth. You will first need to create a 42 API app in the intranet.

**Instructions**

1. Generate a new API application on the [42 intranet](https://profile.intra.42.fr/oauth/applications/new)
2. In the field Redirect URI add: http://localhost:4001/api/auth/callback/42-school
3. From the available scopes, choose "Access the user public data" and then proceed to submit.
4. Save the credentials, you will need them later.

<br/><br/>

## Getting Started

Clone the repository locally

```sh
git clone git@github.com:hivehelsinki/42-api-keychain keychain
cd keychain
```

[...] #TODO

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

<br/><br/>

## FAQ

**How often it checks the keys and how to change it?**

The keys are checked every day at 10am. To adjust this schedule, you can modify the time or frequency within the `back/tasks/scheduled-check.js` file. However, I strongly recommend against changing the frequency. The code in the backend is not optimally structured for altering the frequency, and doing so could potentially lead to additional notifications or even missed notifications.

**The app API's secret rotated, how to update the secret for this service**

To update the API secret for the app, follow these steps:

1. Open the `.env` file
2. Locate and replace the FT_SECRET entry with the new one.
3. Save the changes to the `.env` file

After updating the secret in the .env file, you'll need to reload the container with the new configuration. To do this, run the following command in your terminal:

```
docker-compose down && docker-compose up -d
```

This command will take down the existing container and then start it again with the updated secret.

**I'm a student and I want to use Keychain, how does that work?**

Please note that if you intend to run this application as a student, you'll need to edit the file `front/src/lib/auth.ts`. In this file, you should replace the section responsible for verifying the user's staff status with a check based on your
login credentials.

<br/><br/>

## GDPR

The application doesn't store any information that falls under GDPR regulations.

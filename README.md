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

Moreover, this app addresses another common challenge: the ownership of keys by individual team members. By consolidating all your team's keys in one accessible platform, you can avoid the surprise of an imminent key expiration while a team member is on vacation.

**Screenshots:**

<div align='center'>

</div>

## Features

- [x] Send Slack notifications when an app is not valid.
- [ ] Send Slack notifications when an app is about to expire.
- [ ] Update expiration date if it changed.
- [ ] Allows to send notifications on Discord instead of Slack

## Requirements

This app is developed to run with the 42 OAuth. You will first need to create a 42 API app in the intranet.

**Instructions**

1. Create a new API application on the [42 intranet](https://profile.intra.42.fr/oauth/applications/new)
2. In the field Redirect URI add: http://localhost:4001/api/auth/callback/42-school
3. In the scopes select "Access the user public data" and submit.
4. Save the credentials you will need them later.

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

Now you can access you application on [localhost:3000](http://localhost:4001)

<br/><br/>

## GDPR

The application doesn't store any information that falls under GDPR regulations.

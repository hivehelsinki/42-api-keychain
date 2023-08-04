const { IncomingWebhook } = require("@slack/webhook");

const URI = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(URI);

async function send(message) {
  try {
    await webhook.send(message);
  } catch (error) {
    console.error(error);
  }
}

async function error(app) {
  const message = {
    attachments: [
      {
        fallback: "Keychain - error to fetch app token",
        color: "#ff9408",
        // title: `Error with ${app.name.toUpperCase()}`,
        text: `We encountered an issue while attempting to generate a token for <https://profile.intra.42.fr/oauth/applications/${
          app.id
        }|${app.name.toUpperCase()}>, which is owned by ${
          app.ownedBy
        }. To troubleshoot this problem, consider the following hints:\n\n \
 ·   Verify if the credentials on the keychain app are still valid and up-to-date.\n \
 ·   Check if the 42API is currently operational and running.`,
      },
    ],
  };

  send(message);
}

module.exports = {
  error,
};

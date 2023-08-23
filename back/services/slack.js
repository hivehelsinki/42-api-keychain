const { IncomingWebhook } = require("@slack/webhook");
const { PrismaClient } = require("@prisma/client");
const logger = require("../lib/logger");

async function getSettings() {
  const prisma = new PrismaClient();
  const data = await prisma.Setting.findMany();

  const settings = data.reduce((acc, row) => {
    acc[row.settingKey] = row.settingValue;
    return acc;
  }, {});

  return settings;
}

async function send(message) {
  const settings = await getSettings();

  if (settings.slack_enabled !== "true") {
    return;
  }

  const URI = settings.slack_webhook_url;
  const webhook = new IncomingWebhook(URI);
  try {
    await webhook.send(message);
  } catch (err) {
    logger.error(err);
  }
}

function error(app) {
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

function reminder(app, time) {
  const message = {
    attachments: [
      {
        fallback: "Keychain - Incoming expiration",
        color: "#f5e10c",
        text: `<https://profile.intra.42.fr/oauth/applications/${app.id}|${app.name}>, owned by ${app.ownedBy}, is set to \`expire in ${time}\`. We strongly recommend renewing it promptly to prevent any disruption. Kindly update the new secret not only on your service but also within the Keychain app to ensure uninterrupted functionality.
        `,
      },
    ],
  };
  send(message);
}

module.exports = {
  error,
  reminder,
};

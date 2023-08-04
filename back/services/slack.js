const { IncomingWebhook } = require("@slack/webhook");
const { PrismaClient } = require("@prisma/client");

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

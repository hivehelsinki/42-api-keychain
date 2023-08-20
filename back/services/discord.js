const axios = require("axios");
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

  if (settings.discord_enabled !== "true") {
    return;
  }

  const URI = settings.discord_webhook_url;

  try {
    await axios.post(URI, message);
  } catch (error) {
    logger.error(error);
  }
}

async function error(app) {
  const message = {
    embeds: [
      {
        title: `Error with ${app.name.toUpperCase()}`,
        description: `We encountered an issue while attempting to generate a token for <https://profile.intra.42.fr/oauth/applications/${
          app.id
        }|${app.name.toUpperCase()}>, which is owned by ${
          app.ownedBy
        }. To troubleshoot this problem, consider the following hints:\n\n \
  ·   Verify if the credentials on the keychain app are still valid and up-to-date.\n \
  ·   Check if the 42API is currently operational and running.`,
        color: 0xff9408,
      },
    ],
  };

  send(message);
}

async function reminder(app, time) {
  const message = {
    embeds: [
      {
        title: "Incoming expiration",
        description: `<https://profile.intra.42.fr/oauth/applications/${app.id}|${app.name}>, owned by ${app.ownedBy}, is set to \`expire in ${time}\`. We strongly recommend renewing it promptly to prevent any disruption. Kindly update the new secret not only on your service but also within the Keychain app to ensure uninterrupted functionality.`,
        color: 0xf5e10c,
      },
    ],
  };

  send(message);
}

module.exports = {
  error,
  reminder,
};

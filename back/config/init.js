const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function initSettings() {
  const defaultSettings = [
    { key: "slack_enabled", value: "false" },
    { key: "slack_webhook_url", value: "" },
  ];

  try {
    for (const { key, value } of defaultSettings) {
      await prisma.settings.upsert({
        create: { setting_key: key, setting_value: value },
        where: { setting_key: key },
        update: {},
      });
    }
  } catch (error) {
    console.error("Error inserting default settings: ", error);
  }
}

module.exports = {
  initialize: () => {
    initSettings();
  },
};

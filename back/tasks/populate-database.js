const { PrismaClient } = require("@prisma/client");

const defaultSettings = [
  { key: "slack_enabled", value: "false" },
  { key: "slack_webhook_url", value: "" },
];

async function populateDatabase() {
  const prisma = new PrismaClient();

  try {
    for (const { key, value } of defaultSettings) {
      await prisma.Setting.upsert({
        create: { settingKey: key, settingValue: value },
        where: { settingKey: key },
        update: {},
      });
    }
  } catch (error) {
    throw error;
  }
}

populateDatabase();

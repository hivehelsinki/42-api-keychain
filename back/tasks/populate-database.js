const { PrismaClient } = require("@prisma/client");

const defaultSettings = [
  { key: "slack_enabled", value: "false" },
  { key: "slack_webhook_url", value: "" },
  { key: "discord_enabled", value: "false" },
  { key: "discord_webhook_url", value: "" },
];

async function populateDatabase() {
  const prisma = new PrismaClient();

  try {
    for (const { key, value } of defaultSettings) {
      await upsertSetting(prisma, key, value);
    }
  } catch (error) {
    console.error(`Error populating database: ${error.message}`);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function upsertSetting(prisma, key, value) {
  await prisma.Setting.upsert({
    create: { settingKey: key, settingValue: value },
    where: { settingKey: key },
    update: {},
  });
}

module.exports = {
  exec: () => populateDatabase(),
};

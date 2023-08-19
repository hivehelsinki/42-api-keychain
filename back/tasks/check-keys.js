const { PrismaClient } = require("@prisma/client");
const slackService = require("../services/slack");
const fortyTwoService = require("../services/fortytwo");
const logger = require("../lib/logger");

const REMINDER_DAYS_1 = 14;
const REMINDER_DAYS_2 = 7;
const REMINDER_HOURS = 24;

async function updateRotation(key, date) {
  const prisma = new PrismaClient();
  await prisma.Key.update({
    where: {
      id: key.id,
    },
    data: {
      secretValidUntil: date,
    },
  });
  logger.info(
    `${key.name} secret_valid_until has been updated from ${key.secretValidUntil} to ${date}`,
  );
}

async function processKey(key) {
  const res = await fortyTwoService.check(key.clientId, key.clientSecret);

  if (!res) {
    logger.error(
      `Failed to fetch a token for the key: name=${key.name} id=${key.id}`,
    );
    slackService.error(key);
    return;
  }

  const tokenDate = new Date(res.secret_valid_until * 1000);
  if (tokenDate.getTime() !== key.secretValidUntil.getTime()) {
    await updateRotation(key, tokenDate);
  }

  const timeDiff = tokenDate - new Date();
  const days = parseInt(timeDiff / (1000 * 60 * 60 * 24));
  const hours = parseInt(timeDiff / (1000 * 60 * 60));

  if (days === REMINDER_DAYS_1 || days === REMINDER_DAYS_2) {
    slackService.reminder(key, `${days} days`);
    return;
  }
  if (hours >= 0 && hours <= REMINDER_HOURS) {
    slackService.reminder(key, `${hours} hours`);
  }
}

async function checkKeys() {
  logger.info("running key validity check...");
  const prisma = new PrismaClient();
  try {
    const keys = await prisma.Key.findMany();

    for (const key of keys) {
      await processKey(key);
    }
    logger.info(`${keys.length} keys checked`);
  } catch (error) {
    logger.error(`Error checking keys: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  checkKeys,
};

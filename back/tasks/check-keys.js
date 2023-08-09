const { PrismaClient } = require("@prisma/client");
const slackService = require("../services/slack");
const fortyTwoService = require("../services/fortytwo");

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
  console.log(
    `${key.name} secret_valid_until has been updated from ${key.secretValidUntil} to ${date}`
  );
}

async function processKey(key) {
  const prisma = new PrismaClient();
  const res = await fortyTwoService.check(key.clientId, key.clientSecret);

  if (!res) {
    console.error(
      `Failed to fetch a token for the key: name=${key.name} id=${key.id}`
    );
    slackService.error(key);
    return;
  }

  const tokenDate = new Date(res.secret_valid_until * 1000);
  if (tokenDate.getTime() != key.secretValidUntil.getTime()) {
    await updateRotation(key, tokenDate);
  }

  const timeDiff = tokenDate - new Date();
  const days = parseInt(timeDiff / (1000 * 60 * 60 * 24));
  const hours = parseInt(timeDiff / (1000 * 60 * 60));

  console.log(key.name, days, hours);
  if (days === 14 || days === 7) {
    slackService.reminder(key, `${days} days`);
    return;
  }
  if (hours >= 0 && hours <= 24) {
    slackService.reminder(key, `${hours} hours`);
    return;
  }
}

async function CheckKeys() {
  console.log("running key validity check...");
  const prisma = new PrismaClient();
  const keys = await prisma.Key.findMany();

  for (const key of keys) {
    await processKey(key);
  }
  console.log(`${keys.length} keys checked`);
}

module.exports = {
  CheckKeys,
};

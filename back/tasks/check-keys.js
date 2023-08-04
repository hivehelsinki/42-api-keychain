const { PrismaClient } = require("@prisma/client");
const slackService = require("../services/slack");
const fortyTwoService = require("../services/fortytwo");

async function checkKey(key) {
  const res = await fortyTwoService.check(key.clientId, key.clientSecret);

  if (!res) {
    slackService.error(key);
    console.error(
      `Failed to fetch a token for the key: name=${key.name} id=${key.id}`
    );
    return;
  }

  const isValid = new Date(res.secret_valid_until * 1000) > Date.now();
  if (!isValid) {
    // TODO: key X is  not valid anymore.
    console.log("invalid key");
    return;
  }
}

async function CheckKeys() {
  console.log("running key validity check...");
  const prisma = new PrismaClient();
  const keys = await prisma.Key.findMany();

  for (const key of keys) {
    await checkKey(key);
  }
  console.log(`${keys.length} keys checked`);
}

module.exports = {
  CheckKeys,
};

const { PrismaClient } = require("@prisma/client");
// const slackService = require("../services/slack");
const fortyTwoService = require("../services/fortytwo");

async function checkKey(key) {
  const res = await fortyTwoService.check(key.clientId, key.clientSecret);

  if (!res) {
    // TODO: failed to fetch information for the key X
    console.log("invalid key");
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
}

module.exports = {
  CheckKeys,
};

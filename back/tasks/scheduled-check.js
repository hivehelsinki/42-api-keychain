const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
// const slackService = require("../services/slack-service");

async function runApiKeyValidationTask() {
  console.log("running key validity check...");

  const prisma = new PrismaClient();

  // get all VALID Keys
  const keys = await prisma.Key.findMany();

  for (const key of keys) {
    console.log(key);
  }

  // loop keys and check validity

  // if invalid, set unvalid + notif?
}

module.exports = {
  schedule: () => {
    // schedule the task to run ...
    console.log("hello");
  },
};

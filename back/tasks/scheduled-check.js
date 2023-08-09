const cron = require("node-cron");
const { CheckKeys } = require("./check-keys");

async function runApiKeyValidationTask() {
  console.log("running key validity check...");
  CheckKeys();
}

module.exports = {
  schedule: () => {
    cron.schedule("0 10 */1 * *", runApiKeyValidationTask); // every day at 10:00
  },
};

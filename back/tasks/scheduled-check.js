const cron = require("node-cron");
const { CheckKeys } = require("./check-keys");

module.exports = {
  schedule: () => {
    CheckKeys();
    cron.schedule("0 10 */1 * *", CheckKeys); // every day at 10:00
  },
};

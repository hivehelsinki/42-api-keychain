const { IncomingWebhook } = require("@slack/webhook");

const URI = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(URI);

async function sendSlackMessage(message) {
  try {
    await webhook.send(message);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  sendSlackMessage,
};

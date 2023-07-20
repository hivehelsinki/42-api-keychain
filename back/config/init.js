const database = require("./database");

async function createSettingsTable() {
  try {
    await database.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        setting_key VARCHAR(255) NOT NULL,
        setting_value VARCHAR(255) NOT NULL
      );`);
  } catch (err) {
    console.error("Error creating table settings: ", err);
  }

  try {
    database.query(`
      INSERT INTO settings (setting_key, setting_value)
      VALUES
        ('slack_enabled', 'false'),
        ('slack_webhook_url', '')
      ON CONFLICT DO NOTHING;
    `);
  } catch (error) {
    console.error("Error inserting default settings: ", error);
  }
}

async function createKeysTable() {
  try {
    database.query(`
      CREATE TABLE IF NOT EXISTS keys (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        client_id TEXT NOT NULL,
        client_secret TEXT NOT NULL,
        secret_valid_until TIMESTAMP NOT NULL,
        owned_by TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );`);
  } catch (err) {
    console.error("Error creating table settings: ", err);
  }
}

module.exports = {
  initialize: () => {
    createSettingsTable();
    createKeysTable();
  },
};

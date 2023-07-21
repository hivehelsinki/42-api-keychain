const database = require("./database");

async function createSettingsTable() {
  const defaultSettings = [
    { key: "slack_enabled", value: "false" },
    { key: "slack_webhook_url", value: "" },
    // Add more default settings as needed
  ];

  try {
    await database.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        setting_key TEXT NOT NULL,
        setting_value TEXT
      );`);
  } catch (err) {
    console.error("Error creating table settings: ", err);
  }

  try {
    for (const { key, value } of defaultSettings) {
      await database.query(
        `
          INSERT INTO settings (setting_key, setting_value)
          SELECT $1, $2
          WHERE NOT EXISTS (SELECT 1 FROM settings WHERE setting_key = $1)
        `,
        [key, value]
      );
    }

    console.log("Default settings inserted successfully.");
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

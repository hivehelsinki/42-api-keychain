const database = require("./database");

module.exports = {
  initialize: () => {
    let query = `
            create table if not exists keys (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                client_id TEXT NOT NULL,
                client_secret TEXT NOT NULL,
                secret_valid_until TEXT NOT NULL,
                owned_by TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW()
            );
        `;
    database.query(query, (err) => {
      if (err) console.error(err);
      else console.log("keys table created");
    });
  },
};
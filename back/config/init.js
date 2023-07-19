const database = require("./database");

module.exports = {
  initialize: () => {
    let query = `
            create table if not exists settings (
                id TEXT PRIMARY KEY,
                campus_id integer,
                slack BOOLEAN,
                slack_webhook TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT NOW()
            );
    `;

    database.query(query, (err) => {
      if (err) console.error(err);
      else console.log("settings table created");
    });

    query = `
            create table if not exists keys (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                client_id TEXT NOT NULL,
                client_secret TEXT NOT NULL,
                secret_valid_until TIMESTAMP NOT NULL,
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

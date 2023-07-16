const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5435,
});

module.exports = {
  connect: () => {
    pool.connect((err) => {
      if (err) console.error(err);
      else console.log("Connected to Postgres database");
    });
  },
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

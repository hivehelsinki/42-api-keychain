var express = require("express");
var router = express.Router();
const database = require("../config/database");

// INDEX
router.get("/", (req, res) => {
  database.query(
    "SELECT * FROM keys ORDER BY secret_valid_until",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// CREATE
router.post("/", (req, res) => {
  const { id, name, client_id, client_secret, secret_valid_until, owned_by } =
    req.body;

  database.query(
    "INSERT INTO keys (id, name, client_id, client_secret, secret_valid_until, owned_by) VALUES ($1, $2, $3, $4, $5, $6) returning *",
    [id, name, client_id, client_secret, secret_valid_until, owned_by],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json(results.rows);
    }
  );
});

// UPDATE
// router.patch("/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const key = keys.find((k) => k.id === id);
//   if (key) {
//     key.client_id = req.body.client_id || key.client_id;
//     key.client_secret = req.body.client_secret || key.client_secret;
//     key.secret_valid_until =
//       req.body.secret_valid_until || key.secret_valid_until;
//     key.owned_by = req.body.owned_by || key.owned_by;
//     res.json(key);
//   } else {
//     res.status(404).json({ error: "Key not found" });
//   }
// });

// DESTROY/DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  database.query("DELETE FROM keys WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

module.exports = router;

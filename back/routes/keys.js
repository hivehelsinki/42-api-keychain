var express = require("express");
var router = express.Router();

let keys = [
  {
    id: 1,
    name: "HIVE - BIGBRO",
    client_id:
      "u-s4t2af-a9ad7a9462d4ca4767c5c464ccae0e4527d7d311d77819c380339b1f33b804ec",
    client_secret: "client_secret1",
    secret_valid_until: "13/06/2024",
    owned_by: "titus",
  },
  {
    id: 2,
    name: "HIVE - API-KEYCHAIN",
    client_id:
      "u-s4t2af-a9ad7a9462d4ca4767c5c464ccae0e4527d7d311d77819c380339b1f33b804ec",
    client_secret: "client_secret1",
    secret_valid_until: "13/09/2024",
    owned_by: "titus",
  },
  {
    id: 3,
    name: "API - TITUS",
    client_id:
      "u-s4t2af-a9ad7a9462d4ca4767c5c464ccae0e4527d7d311d77819c380339b1f33b804ec",
    client_secret: "client_secret1",
    secret_valid_until: "13/09/2024",
    owned_by: "titus",
  },
  {
    id: 4,
    name: "HIVE - EXAM",
    client_id:
      "u-s4t2af-a9ad7a9462d4ca4767c5c464ccae0e4527d7d311d77819c380339b1f33b804ec",
    client_secret: "client_secret1",
    secret_valid_until: "13/09/2024",
    owned_by: "titus",
  },
  {
    id: 5,
    name: "HIVE - MOULINETTE",
    client_id:
      "u-s4t2af-a9ad7a9462d4ca4767c5c464ccae0e4527d7d311d77819c380339b1f33b804ec",
    client_secret: "client_secret1",
    secret_valid_until: "13/09/2024",
    owned_by: "titus",
  },
  {
    id: 6,
    name: "NIBBLER",
    client_id:
      "u-s4t2af-a9ad7a9462d4ca4767c5c464ccae0e4527d7d311d77819c380339b1f33b804ec",
    client_secret: "client_secret1",
    secret_valid_until: "13/09/2024",
    owned_by: "titus",
  },
];

// Get all keys
router.get("/", (req, res) => {
  res.json(keys);
});

// Get a specific key
// router.get("/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const key = keys.find((k) => k.id === id);
//   if (key) {
//     res.json(key);
//   } else {
//     res.status(404).json({ error: "Key not found" });
//   }
// });

// Create a new key
router.post("/", (req, res) => {
  const { id, name, client_id, client_secret, secret_valid_until, owned_by } =
    req.body;
  const newKey = {
    id,
    name,
    client_id,
    client_secret,
    secret_valid_until,
    owned_by,
  };

  keys.push(newKey);
  res.status(201).json(newKey);
});

// Update a key
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const key = keys.find((k) => k.id === id);
  if (key) {
    key.client_id = req.body.client_id || key.client_id;
    key.client_secret = req.body.client_secret || key.client_secret;
    key.secret_valid_until =
      req.body.secret_valid_until || key.secret_valid_until;
    key.owned_by = req.body.owned_by || key.owned_by;
    res.json(key);
  } else {
    res.status(404).json({ error: "Key not found" });
  }
});

// Delete a key
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = keys.findIndex((k) => k.id === id);
  if (index !== -1) {
    const deletedKey = keys.splice(index, 1)[0];
    res.json(deletedKey);
  } else {
    res.status(404).json({ error: "Key not found" });
  }
});

module.exports = router;

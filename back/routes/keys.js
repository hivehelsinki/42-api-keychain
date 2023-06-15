var express = require('express');
var router = express.Router();

let keys = [
  { id: 1, uid: 'abc123', secret: 'secret1', end_at: '2023-06-30', owned_by: 'titus' },
  { id: 2, uid: 'def456', secret: 'secret2', end_at: '2023-07-15', owned_by: 'amedeo' }
];

// Get all keys
router.get('/', (req, res) => {
  res.json(keys);
});

// Get a specific key
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const key = keys.find(k => k.id === id);
  if (key) {
      res.json(key);
  } else {
      res.status(404).json({ error: 'Key not found' });
  }
});

// Create a new key
router.post('/', (req, res) => {
  const { uid, secret, end_at, owned_by } = req.body;
  const id = keys.length + 1;
  const newKey = { id, uid, secret, end_at, owned_by };
  keys.push(newKey);
  res.status(201).json(newKey);
});

// Update a key
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const key = keys.find(k => k.id === id);
  if (key) {
      key.uid = req.body.uid || key.uid;
      key.secret = req.body.secret || key.secret;
      key.end_at = req.body.end_at || key.end_at;
      key.owned_by = req.body.owned_by || key.owned_by;
      res.json(key);
  } else {
      res.status(404).json({ error: 'Key not found' });
  }
});

// Delete a key
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = keys.findIndex(k => k.id === id);
  if (index !== -1) {
      const deletedKey = keys.splice(index, 1)[0];
      res.json(deletedKey);
  } else {
      res.status(404).json({ error: 'Key not found' });
  }
});


module.exports = router;
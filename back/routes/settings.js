var express = require("express");
var router = express.Router();
const database = require("../config/database");

// INDEX
router.get("/", async (req, res) => {
  try {
    const result = await database.query("SELECT * FROM settings");
    const settings = result.rows.reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});

    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:key", async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  try {
    const result = await database.query(
      "UPDATE settings SET setting_value = $1 WHERE setting_key = $2",
      [value, key]
    );

    if (result.rowCount > 0) {
      res.json({ message: "Setting updated successfully" });
    } else {
      res.status(404).json({ error: `Setting not found` });
    }
  } catch (error) {
    console.error("Error updating setting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

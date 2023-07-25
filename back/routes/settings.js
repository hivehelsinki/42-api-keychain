var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// INDEX
router.get("/", async (req, res) => {
  try {
    const result = await prisma.settings.findMany();
    const settings = result.reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});

    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/:key", async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  try {
    const resp = await prisma.settings.update({
      where: {
        setting_key: key,
      },
      data: {
        setting_value: String(value),
      },
    });

    res.status(200).json(resp);
  } catch (error) {
    console.error("Error updating setting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

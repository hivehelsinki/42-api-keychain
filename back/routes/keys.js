const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const keys = await prisma.keys.findMany({
      orderBy: { secret_valid_until: "asc" },
    });
    return res.json(keys);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { id, name, client_id, client_secret, secret_valid_until, owned_by } =
    req.body;

  try {
    const newKey = await prisma.keys.create({
      data: {
        id,
        name,
        client_id,
        client_secret,
        secret_valid_until,
        owned_by,
      },
    });

    res.status(201).json(newKey);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DESTROY/DELETE
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.keys.delete({
      where: {
        id: id,
      },
    });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

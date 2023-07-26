import getPrismaInstance from "../utils/prisma-client.js";

export const getKeys = async (req, res, next) => {
  const prisma = getPrismaInstance();

  try {
    const keys = await prisma.keys.findMany({
      orderBy: { secret_valid_until: "asc" },
    });
    return res.json(keys);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

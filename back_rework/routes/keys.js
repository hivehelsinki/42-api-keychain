import { Router } from "express";
import { getKeys } from "../controllers/keys.js";

const router = Router();

router.get("/", getKeys);

export default router;

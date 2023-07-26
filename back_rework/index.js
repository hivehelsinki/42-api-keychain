import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import KeyRouter from "./routes/keys.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/keys", KeyRouter);

const server = app.listen(process.env.PORT || 5001, () => {
  console.log(`Server started on port ${server.address().port}`);
});

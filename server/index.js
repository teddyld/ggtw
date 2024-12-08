import express from "express";

import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import { client } from "./src/mongodb.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(express.json());

const catchErrors = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message });
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message });
    } else {
      console.log(err);
      res.status(500).send({ error: "A system error ocurred" });
    }
  }
};

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.listen(5050, () => console.log("🚀 Server is listening on port 5050..."));

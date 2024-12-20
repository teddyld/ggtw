import express from "express";

import "dotenv/config";
import cors from "cors";
import { clerkMiddleware, createClerkClient } from "@clerk/express";

import { clerkWebHook } from "./src/webhook.js";
import { InputError, AccessError } from "./src/error.js";
import { getUserProgram, updateUserProgram } from "./src/service.js";

const app = express();
const port = process.env.PORT || 5050;
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(clerkMiddleware({ clerkClient: clerkClient }));

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
  res.json({ success: true, message: "Hello World" });
});

app.post(
  "/api/webhooks",
  catchErrors(async (req, res) => {
    const headers = req.headers;
    const payload = JSON.stringify(req.body);
    await clerkWebHook(headers, payload);
  })
);

app.get(
  "/user/program/:id",
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { program } = await getUserProgram(id);
    return res.json({ program, success: true });
  })
);

app.put(
  "/user/program/update",
  catchErrors(async (req, res) => {
    const { id, program } = req.body;
    await updateUserProgram(id, program);
    return res.json({
      success: true,
      message: "Successfully updated user program",
    });
  })
);

app.listen(port, () =>
  console.log(`🚀 Server is listening on port ${port}...`)
);

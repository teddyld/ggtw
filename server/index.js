import express from "express";

import "dotenv/config";
import cors from "cors";
import { clerkMiddleware, createClerkClient } from "@clerk/express";

import { clerkWebHook } from "./src/webhook.js";
import { InputError, AccessError } from "./src/error.js";
import {
  deleteWorkout,
  getUserWorkouts,
  updateWorkout,
  getUserStatistics,
  updateStatistics,
  deleteUserStatistics,
  getUserSettings,
  updateUserSettings,
} from "./src/service.js";

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
      res
        .status(500)
        .send({ error: `A system error ocurred ${JSON.stringify(err)}` });
    }
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!");
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
  "/user/workouts/:id",
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { workouts } = await getUserWorkouts(id);
    return res.json({ workouts, success: true });
  })
);

app.put(
  "/user/workout/update",
  catchErrors(async (req, res) => {
    const { userId, workout } = req.body;
    await updateWorkout(userId, workout);
    return res.json({
      success: true,
      message: "Successfully updated user workout",
    });
  })
);

app.put(
  "/user/workout/delete",
  catchErrors(async (req, res) => {
    const { userId, workoutId } = req.body;
    await deleteWorkout(userId, workoutId);
    return res.json({
      success: true,
      message: "Successfully removed user workout",
    });
  })
);

app.get(
  "/user/statistics/:id",
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { statistics } = await getUserStatistics(id);
    return res.json({ statistics, success: true });
  })
);

app.put(
  "/user/statistics/log",
  catchErrors(async (req, res) => {
    const { userId, logData } = req.body;
    await updateStatistics(userId, logData);
    return res.json({
      success: true,
      message: "Successfully updated user statistics",
    });
  })
);

app.put(
  "/user/statistics/delete",
  catchErrors(async (req, res) => {
    const { userId } = req.body;
    await deleteUserStatistics(userId);
    return res.json({
      success: true,
      message: "Successfully deleted user statistics",
    });
  })
);

app.get(
  "/user/settings/:id",
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { settings } = await getUserSettings(id);
    return res.json({ settings, success: true });
  })
);

app.put(
  "/user/settings/update",
  catchErrors(async (req, res) => {
    const { userId, settings } = req.body;
    await updateUserSettings(userId, settings);
    return res.json({
      success: true,
      message: "Successfully updated user settings unit",
    });
  })
);

app.listen(port, () =>
  console.log(`🚀 Server is listening on port ${port}...`)
);

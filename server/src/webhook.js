import "dotenv/config";
import { Webhook } from "svix";
import { db } from "./mongodb.js";

export const clerkWebHook = (headers, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      // Attempt to verify the incoming webhook
      const wh = new Webhook(process.env.SIGNING_SECRET);
      const evt = wh.verify(payload, headers);

      const { id, ...attributes } = evt.data;
      const eventType = evt.type;

      // Sync user to MongoDB
      const collection = db.collection("users");

      if (eventType === "user.created") {
        await collection.updateOne(
          { user: id },
          { $setOnInsert: { workouts: {}, statistics: {} } },
          { upsert: true },
        );
      } else if (eventType === "user.deleted") {
        await collection.deleteOne({ user: id });
      }

      return resolve({
        success: true,
        message: "Webhook received",
      });
    } catch (err) {
      return reject({
        success: false,
        message: err.message,
      });
    }
  });

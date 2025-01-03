import { db } from "./mongodb.js";
import { AccessError } from "./error.js";

export const getUserProgram = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      const user = await collection.findOne({ user: id });
      return resolve({ program: user.program });
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const updateUserWorkout = async (id, workout) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      const workoutField = `program.${workout.id}`;
      await collection.updateOne(
        { user: id },
        { $set: { [workoutField]: workout } },
      );
      return resolve();
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const deleteUserWorkout = async (id, workoutId) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      const workoutField = `program.${workoutId}`;
      await collection.updateOne(
        { user: id },
        { $unset: { [workoutField]: "" } },
      );
      return resolve();
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

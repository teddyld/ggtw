import { db } from "./mongodb.js";
import { AccessError } from "./error.js";

export const getUserWorkouts = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      const user = await collection.findOne({ user: id });
      return resolve({ workouts: user.workouts });
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const updateWorkout = async (userId, workout) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      const workoutField = `workouts.${workout.id}`;
      await collection.updateOne(
        { user: userId },
        { $set: { [workoutField]: workout } },
      );
      return resolve();
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const deleteWorkout = async (userId, workoutId) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      const workoutField = `workouts.${workoutId}`;
      await collection.updateOne(
        { user: userId },
        { $unset: { [workoutField]: "" } },
      );
      return resolve();
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

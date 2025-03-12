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
        { $set: { [workoutField]: workout } }
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
        { $unset: { [workoutField]: "" } }
      );
      return resolve();
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const getUserStatistics = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      const user = await collection.findOne({ user: id });

      return resolve({
        statistics: user.statistics,
      });
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const updateStatisticsLog = async (userId, logData) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      const dateField = logData.date;
      const exerciseName = logData.exerciseName;
      const activityField = `statistics.activity.${dateField}.${exerciseName}`;
      const exerciseField = `statistics.exercises.${exerciseName}`;
      const personalBestField = `statistics.personalBests.${exerciseName}`;

      const user = await collection.findOne({ user: userId });
      const personalBests = user.statistics.personalBests;

      let date = new Date(dateField.split("/").reverse().join("-"));
      date = date.toLocaleString("en-us", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // Sort sets by max weight
      const orderedSets = Array.from(logData.sets);
      orderedSets.sort(
        (a, b) =>
          b.weight - a.weight ||
          (b.reps ?? 0) - (a.reps ?? 0) ||
          (b.time ?? 0) - (a.time ?? 0)
      );

      const bestSet = orderedSets[0];

      if (
        !personalBests[exerciseName] ||
        personalBests[exerciseName].weight < bestSet.weight
      ) {
        await collection.updateOne(
          { user: userId },
          {
            $set: {
              [exerciseField]: logData.muscleGroups,
            },
            $set: {
              [personalBestField]: { ...bestSet, date: date },
            },
            $push: {
              [activityField]: { $each: logData.sets },
            },
          }
        );
      } else {
        await collection.updateOne(
          { user: userId },
          {
            $set: {
              [exerciseField]: logData.muscleGroups,
            },
            $push: {
              [activityField]: { $each: logData.sets },
            },
          }
        );
      }

      return resolve();
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const deleteUserStatistics = async (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const collection = db.collection("users");
      await collection.updateOne(
        { user: userId },
        {
          $set: {
            statistics: {
              startDate: new Date(),
              activity: {},
              exercises: {},
              personalBests: {},
            },
          },
        }
      );
      return resolve();
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

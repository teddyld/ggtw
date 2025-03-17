import { db } from "./mongodb.js";
import { AccessError } from "./error.js";

export const getUserWorkouts = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.findOne().where("user").equals(id).lean();
      return resolve({ workouts: user.workouts });
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const updateWorkout = async (userId, workout) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.findOneAndUpdate(
        { user: userId },
        { $set: { [`workouts.${workout.id}`]: workout } },
        { upsert: true }
      );
      return resolve();
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const deleteWorkout = async (userId, workoutId) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.findOneAndUpdate(
        { user: userId },
        { $unset: { [`workouts.${workoutId}`]: "" } }
      );
      return resolve();
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const getUserStatistics = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.findOne().where("user").equals(id).lean();
      return resolve({
        statistics: user.statistics,
      });
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const updateStatistics = async (userId, logData) =>
  new Promise(async (resolve, reject) => {
    try {
      const dateField = logData.date;
      const exerciseName = logData.exerciseName;
      const activityField = `statistics.activity.${dateField}.${exerciseName}`;
      const exerciseField = `statistics.exercises.${exerciseName}`;
      const personalBestField = `statistics.personalBests.${exerciseName}`;

      const user = await db.findOne().where("user").equals(userId);
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
        personalBests[exerciseName].weight < bestSet.weight ||
        (personalBests[exerciseName].weight === bestSet.weight &&
          personalBests[exerciseName].reps < bestSet.reps)
      ) {
        await db.findOneAndUpdate(
          { user: userId },
          {
            $set: {
              [exerciseField]: logData.muscleGroups,
              [personalBestField]: {
                ...bestSet,
                date: date,
              },
            },
            $push: {
              [activityField]: { $each: logData.sets },
            },
          }
        );
      } else {
        await db.findOneAndUpdate(
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
      console.log(err);
      return reject(new AccessError(err.message));
    }
  });

export const deleteUserStatistics = async (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.findOneAndUpdate(
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

export const getUserSettings = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.findOne().where("user").equals(id).lean();
      return resolve({
        settings: user.settings,
      });
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

export const updateUserSettings = async (userId, settings) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.updateOne({ user: userId }, { settings: settings });
      return resolve();
    } catch (err) {
      return reject(new AccessError(err.message));
    }
  });

import { convertUnits } from "../../utils/unitConversion";
import { unitType } from "../workout/workoutData";

export type logValueType = {
  weight: number;
  reps?: number;
  time?: number;
  units: unitType;
};

export type logType = {
  exerciseName: string;
  muscleGroups: string[];
  sets: logValueType[]; // Array of set values to log
  date: string; // Current date
};

type loggedExercises = Record<string, logValueType[]>;
export type pbType = Record<string, logValueType & { date: string }>;

export type statisticsType = {
  activity: Record<string, loggedExercises>;
  exercises: Record<string, string[]>;
  personalBests: pbType;
  startDate: Date;
};

export type activityType = {
  date: Date;
  activity: loggedExercises;
};

export type exerciseRecordType = {
  date: string;
  "MAX Weight": number;
  "MAX Reps": number | undefined;
  "MAX Time": number | undefined;
};

export type summaryType = {
  exerciseName: string;
  personalBest: exerciseRecordType;
  currentRecord: exerciseRecordType;
  status: "UP" | "DOWN" | "NO CHANGE";
};

// Sort sets by sortOrder
export const orderSets = (
  sets: logValueType[],
  sortOrder: string | null,
  units: unitType,
) => {
  const orderedSets = Array.from(sets);
  if (sortOrder === "Weight") {
    orderedSets.sort((a, b) => {
      const x = convertUnits(a.weight, a.units, units);
      const y = convertUnits(b.weight, b.units, units);
      return (
        y - x || (b.reps ?? 0) - (a.reps ?? 0) || (b.time ?? 0) - (a.time ?? 0)
      );
    });
  } else if (sortOrder === "Reps") {
    orderedSets.sort((a, b) => {
      const x = convertUnits(a.weight, a.units, units);
      const y = convertUnits(b.weight, b.units, units);
      return (
        (b.reps ?? 0) - (a.reps ?? 0) || y - x || (b.time ?? 0) - (a.time ?? 0)
      );
    });
  } else {
    orderedSets.sort((a, b) => {
      const x = convertUnits(a.weight, a.units, units);
      const y = convertUnits(b.weight, b.units, units);
      return (
        (b.time ?? 0) - (a.time ?? 0) || y - x || (b.reps ?? 0) - (a.reps ?? 0)
      );
    });
  }

  return orderedSets;
};

// Return the max exerciseRecord ordered by sortOrder for exerciseName
export const createMaxRecord = (
  record: activityType,
  exerciseName: string,
  sortOrder: string | null,
  units: unitType,
) => {
  const orderedSets = orderSets(
    record.activity[exerciseName],
    sortOrder,
    units,
  );
  const maxSet = orderedSets[0];

  const exerciseRecord: exerciseRecordType = {
    date: record.date.toLocaleString("en-us", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    "MAX Weight": convertUnits(maxSet.weight, maxSet.units, units),
    "MAX Reps": maxSet.reps,
    "MAX Time": maxSet.time,
  };

  return exerciseRecord;
};

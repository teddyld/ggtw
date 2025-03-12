export type logValueType = {
  weight: number;
  reps?: number;
  time?: number;
};

export type logType = {
  exerciseName: string;
  muscleGroups: string[];
  sets: logValueType[]; // Array of set values to log
  date: string; // Current date
};

type loggedExercises = Record<string, logValueType[]>;

export type statisticsType = {
  activity: Record<string, loggedExercises>;
  exercises: Record<string, string[]>;
  startDate: Date;
};

export type activityType = {
  date: Date;
  activity: loggedExercises;
};

export type exerciseRecordType = {
  date: string;
  "MAX Weight": number;
  "MAX Reps"?: number;
  "MAX Time"?: number;
};

export type summaryType = {
  exerciseName: string;
  previousBest: exerciseRecordType;
  currentRecord: exerciseRecordType;
  status: "UP" | "DOWN" | "NO CHANGE";
};

// Sort sets by sortOrder
export const orderSets = (sets: logValueType[], sortOrder: string | null) => {
  const orderedSets = Array.from(sets);
  if (sortOrder === "Weight") {
    orderedSets.sort(
      (a, b) =>
        b.weight - a.weight ||
        (b.reps ?? 0) - (a.reps ?? 0) ||
        (b.time ?? 0) - (a.time ?? 0),
    );
  } else if (sortOrder === "Reps") {
    orderedSets.sort(
      (a, b) =>
        (b.reps ?? 0) - (a.reps ?? 0) ||
        b.weight - a.weight ||
        (b.time ?? 0) - (a.time ?? 0),
    );
  } else {
    orderedSets.sort(
      (a, b) =>
        (b.time ?? 0) - (a.time ?? 0) ||
        b.weight - a.weight ||
        (b.reps ?? 0) - (a.reps ?? 0),
    );
  }

  return orderedSets;
};

// Return the max exerciseRecord ordered by sortOrder for exerciseName
export const createMaxRecord = (
  record: activityType,
  exerciseName: string,
  sortOrder: string | null,
) => {
  const orderedSets = orderSets(record.activity[exerciseName], sortOrder);
  const maxSet = orderedSets[0];

  const exerciseRecord: exerciseRecordType = {
    date: record.date.toLocaleString("en-us", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    "MAX Weight": maxSet.weight,
  };

  if (maxSet.reps !== -1) {
    exerciseRecord["MAX Reps"] = maxSet.reps;
  }

  if (maxSet.time !== -1) {
    exerciseRecord["MAX Time"] = maxSet.time;
  }

  return exerciseRecord;
};

export const mockExerciseData: exerciseRecordType[] = [
  { date: "15 Jan, 2023", "MAX Weight": 90, "MAX Reps": 12 },
  { date: "20 Feb, 2023", "MAX Weight": 95, "MAX Reps": 10 },
  { date: "10 May, 2023", "MAX Weight": 110 },
  { date: "04 Jul, 2023", "MAX Weight": 105, "MAX Reps": 8, "MAX Time": 50 },
  { date: "31 Oct, 2023", "MAX Weight": 115 },
  { date: "01 Jan, 2024", "MAX Weight": 120, "MAX Reps": 6 },
  { date: "15 Mar, 2024", "MAX Weight": 125, "MAX Time": 40 },
  { date: "21 Jun, 2024", "MAX Weight": 130, "MAX Reps": 5 },
  { date: "10 Sep, 2024", "MAX Weight": 128 },
  { date: "25 Dec, 2024", "MAX Weight": 135, "MAX Reps": 4, "MAX Time": 30 },
  { date: "14 Feb, 2025", "MAX Weight": 140, "MAX Reps": 3 },
  { date: "01 May, 2025", "MAX Weight": 145, "MAX Time": 25 },
  { date: "20 Aug, 2025", "MAX Weight": 150, "MAX Reps": 2 },
  { date: "11 Nov, 2025", "MAX Weight": 155 },
  { date: "01 Jan, 2026", "MAX Weight": 160, "MAX Reps": 1, "MAX Time": 20 },
];

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

import { v4 as uuidv4 } from "uuid";

export type workoutType = {
  id: string;
  name: string;
  lastAccessed: string;
  exercises: Record<string, exerciseType>;
  exerciseOrder: string[];
  exerciseCount: number;
};

export type unitType = "kg" | "lbs";

export type exerciseType = {
  id: string;
  name: string;
  muscleGroups: string[];
  types: exerciseTypes;
  units: unitType;
  setOrder: string[];
  setCount: number;
  sets: Record<string, setType>;
};

export type setType = {
  id: string;
  values: {
    reps: number;
    weight: number;
    time: number;
  };
};

export type setInputTypes = "weight" | "reps" | "time";
export type exerciseTypes = { reps: boolean; time: boolean };

const chestWorkout: workoutType = {
  id: "workout-1",
  name: "Chest + Triceps",
  lastAccessed: "",
  exercises: {
    "exercise-1": {
      id: "exercise-1",
      name: "Incline Bench Press",
      muscleGroups: ["CHEST"],
      types: { reps: true, time: false },
      units: "kg",
      setOrder: ["set-1", "set-2", "set-3"],
      setCount: 3,
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "exercise-2": {
      id: "exercise-2",
      name: "Cable Flys",
      muscleGroups: ["CHEST"],
      types: { reps: true, time: false },
      units: "kg",
      setOrder: ["set-1", "set-2", "set-3"],
      setCount: 3,
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "exercise-3": {
      id: "exercise-3",
      name: "Tricep Pushdowns",
      muscleGroups: ["TRICEPS"],
      types: { reps: true, time: false },
      units: "kg",
      setOrder: ["set-1", "set-2", "set-3"],
      setCount: 3,
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
      },
    },
  },
  exerciseOrder: ["exercise-1", "exercise-2", "exercise-3"],
  exerciseCount: 3,
};

const backWorkout: workoutType = {
  id: "workout-2",
  name: "Back & Biceps",
  lastAccessed: "",
  exercises: {
    "exercise-1": {
      id: "exercise-1",
      name: "Pullups",
      muscleGroups: ["BACK", "BICEPS"],
      types: { reps: true, time: false },
      units: "kg",
      setOrder: ["set-1", "set-2", "set-3"],
      setCount: 3,
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "exercise-2": {
      id: "exercise-2",
      name: "Chest-Supported Rows",
      muscleGroups: ["BACK"],
      types: { reps: true, time: false },
      units: "kg",
      setOrder: ["set-1", "set-2", "set-3"],
      setCount: 3,
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "exercise-3": {
      id: "exercise-3",
      name: "Bicep Curls",
      muscleGroups: ["BICEPS"],
      types: { reps: true, time: false },
      units: "kg",
      setOrder: ["set-1", "set-2", "set-3"],
      setCount: 3,
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
      },
    },
  },
  exerciseOrder: ["exercise-1", "exercise-2", "exercise-3"],
  exerciseCount: 3,
};

const legsWorkout: workoutType = {
  id: "workout-3",
  name: "Legs",
  lastAccessed: "",
  exercises: {
    "exercise-1": {
      id: "exercise-1",
      name: "Calf Raises",
      muscleGroups: ["CALVES"],
      types: { reps: true, time: false },
      units: "kg",
      setOrder: ["set-1", "set-2", "set-3"],
      setCount: 3,
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "exercise-2": {
      id: "exercise-2",
      name: "Seated Hamstring Curls",
      muscleGroups: ["HAMSTRINGS"],
      types: { reps: true, time: false },
      units: "kg",
      setOrder: ["set-1", "set-2", "set-3"],
      setCount: 3,
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "exercise-3": {
      id: "exercise-3",
      name: "Hacksquats",
      muscleGroups: ["QUADS", "GLUTES"],
      types: { reps: true, time: false },
      units: "kg",
      setOrder: ["set-1", "set-2", "set-3"],
      setCount: 3,
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 0,
            weight: 0,
            time: 0,
          },
        },
      },
    },
  },
  exerciseOrder: ["exercise-1", "exercise-2", "exercise-3"],
  exerciseCount: 3,
};

const templateWorkouts: Record<string, workoutType> = {
  "Back + Biceps": backWorkout,
  "Chest + Triceps": chestWorkout,
  Legs: legsWorkout,
};

export const getTemplate = (name: string) => {
  const template = structuredClone(templateWorkouts[name]);
  // Update id with a generated uuid
  template.id = uuidv4();
  return template;
};

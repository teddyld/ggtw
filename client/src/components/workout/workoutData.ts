import React from "react";
import { ButtonProps } from "@mantine/core";

export type workoutState = {
  name: string;
  exercises: {
    [key: string]: exerciseType;
  };
  exerciseOrder: string[];
  exerciseCount: number;
};

export type exerciseType = {
  id: string;
  name: string;
  muscleGroups: string[];
  type: "reps" | "time";
  setIds: string[];
  sets: {
    [key: string]: {
      id: string;
      values: {
        reps: number;
        weight: number;
        time: number;
      };
    };
  };
};

export type programState = workoutState[];

const chestWorkout: workoutState = {
  name: "Chest + Triceps",
  exercises: {
    "excerise-1": {
      id: "exercise-1",
      name: "Incline Bench Press",
      muscleGroups: ["Chest"],
      type: "reps",
      setIds: ["set-1", "set-2", "set-3"],
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "excerise-2": {
      id: "exercise-2",
      name: "Cable Flys",
      muscleGroups: ["Chest"],
      type: "reps",
      setIds: ["set-1", "set-2", "set-3"],
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "excerise-3": {
      id: "exercise-3",
      name: "Tricep Pushdowns",
      muscleGroups: ["Triceps"],
      type: "reps",
      setIds: ["set-1", "set-2", "set-3"],
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
      },
    },
  },
  exerciseOrder: ["excerise-1", "excerise-2", "excerise-3"],
  exerciseCount: 3,
};

export const backWorkout: workoutState = {
  name: "Back & Biceps",
  exercises: {
    "excerise-1": {
      id: "exercise-1",
      name: "Pullups",
      muscleGroups: ["Back", "Biceps"],
      type: "reps",
      setIds: ["set-1", "set-2", "set-3"],
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "excerise-2": {
      id: "exercise-2",
      name: "Chest-Supported Rows",
      muscleGroups: ["Back"],
      type: "reps",
      setIds: ["set-1", "set-2", "set-3"],
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "excerise-3": {
      id: "exercise-3",
      name: "Bicep Curls",
      muscleGroups: ["Biceps"],
      type: "reps",
      setIds: ["set-1", "set-2", "set-3"],
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
      },
    },
  },
  exerciseOrder: ["excerise-1", "excerise-2", "excerise-3"],
  exerciseCount: 3,
};

const legsWorkout: workoutState = {
  name: "Legs",
  exercises: {
    "excerise-1": {
      id: "exercise-1",
      name: "Calf Raises",
      muscleGroups: ["Calves"],
      type: "reps",
      setIds: ["set-1", "set-2", "set-3"],
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "excerise-2": {
      id: "exercise-2",
      name: "Seated Hamstring Curls",
      muscleGroups: ["Hamstrings"],
      type: "reps",
      setIds: ["set-1", "set-2", "set-3"],
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
      },
    },
    "excerise-3": {
      id: "exercise-3",
      name: "Hacksquats",
      muscleGroups: ["Quads", "Glutes"],
      type: "reps",
      setIds: ["set-1", "set-2", "set-3"],
      sets: {
        "set-1": {
          id: "set-1",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-2": {
          id: "set-2",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
        "set-3": {
          id: "set-3",
          values: {
            reps: 8,
            weight: 0,
            time: 0,
          },
        },
      },
    },
  },
  exerciseOrder: ["excerise-1", "excerise-2", "excerise-3"],
  exerciseCount: 3,
};

export const emptyWorkout: workoutState = {
  name: "",
  exercises: {},
  exerciseOrder: [],
  exerciseCount: 0,
};

export const templateWorkouts = {
  "Back + Biceps": backWorkout,
  "Chest + Triceps": chestWorkout,
  Legs: legsWorkout,
};

export type workoutButtonType = ButtonProps & {
  program: programState;
  setProgram: (program: programState) => Promise<void>;
  children?: React.ReactNode;
};

export const minValue = 0;
export const maxValue = 20;

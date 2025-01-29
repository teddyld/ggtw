import React from "react";

import { exerciseType, workoutType } from "./workoutData";
import Workout from "./Workout";

type WorkoutListType = {
  workout: workoutType;
  exerciseMap: Record<string, exerciseType>;
  setWorkout: (workout: workoutType, message: string) => Promise<void>;
  deleteWorkout: (workoutId: string) => void;
};

const WorkoutList = React.memo(
  ({
    workout,
    exerciseMap,
    setWorkout,
    deleteWorkout,
  }: WorkoutListType) => {
    const exercises = Object.values(exerciseMap);
    return (
      <Workout
        workout={workout}
        exercises={exercises}
        setWorkout={setWorkout}
        deleteWorkout={deleteWorkout}
      />
    );
  },
  (prevProps, nextProps) => prevProps.workout === nextProps.workout,
);

export default WorkoutList;

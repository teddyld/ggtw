import React from "react";

import { exerciseType, workoutType } from "./workoutData";
import Exercise from "./Exercise";

type ExerciseListType = {
  workout: workoutType;
  setWorkout: (workout: workoutType, message: string) => Promise<void>;
  exercise: exerciseType;
};

const ExerciseList = React.memo(
  ({ workout, setWorkout, exercise }: ExerciseListType) => {
    return (
      <Exercise workout={workout} setWorkout={setWorkout} exercise={exercise} />
    );
  },
  (prevProps, nextProps) => prevProps.exercise === nextProps.exercise,
);

export default ExerciseList;

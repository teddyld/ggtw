import React from "react";

import { exerciseType } from "./workoutData";
import Exercise from "./Exercise";

type ExerciseListType = {
  exercise: exerciseType;
  index: number;
};

const ExerciseList = React.memo(
  ({ exercise, index }: ExerciseListType) => {
    return <Exercise exercise={exercise} index={index} />;
  },
  (prevProps, nextProps) => prevProps.exercise === nextProps.exercise,
);

export default ExerciseList;

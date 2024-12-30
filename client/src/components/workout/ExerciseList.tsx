import React from "react";

import {
  exerciseType,
  exerciseTypes,
  setType,
  setInputTypes,
} from "./workoutData";
import Exercise from "./Exercise";

type ExerciseListType = {
  exercise: exerciseType;
  updateSetValue: (
    exerciseId: string,
    setId: string,
    newValue: number,
    type: setInputTypes,
  ) => void;
  deleteSet: (
    exerciseId: string,
    setId: string,
    setSets: (value: React.SetStateAction<setType[]>) => void,
  ) => void;
  addBelowSet: (
    exerciseId: string,
    setId: string,
    setSets: (value: React.SetStateAction<setType[]>) => void,
  ) => void;
  updateSetType: (exerciseId: string, types: exerciseTypes) => void;
  updateExerciseDetails: (
    exerciseId: string,
    newNme: string,
    newMuscleGroups: string[],
  ) => void;
  createSet: (
    exerciseId: string,
    setSets: (value: React.SetStateAction<setType[]>) => void,
  ) => void;
  deleteExercise: (exerciseId: string) => void;
};

const ExerciseList = React.memo(
  ({
    exercise,
    updateSetValue,
    deleteSet,
    addBelowSet,
    updateSetType,
    updateExerciseDetails,
    createSet,
    deleteExercise,
  }: ExerciseListType) => {
    return (
      <Exercise
        exercise={exercise}
        updateSetValue={updateSetValue}
        deleteSet={deleteSet}
        addBelowSet={addBelowSet}
        updateSetType={updateSetType}
        updateExerciseDetails={updateExerciseDetails}
        createSet={createSet}
        deleteExercise={deleteExercise}
      />
    );
  },
  (prevProps, nextProps) => prevProps.exercise === nextProps.exercise,
);

export default ExerciseList;

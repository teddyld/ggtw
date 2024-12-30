import React from "react";
import { exerciseType } from "../components/workout/workoutData";

export const useExercise = (exercise: exerciseType) => {
  const exerciseId = exercise.id;
  const [sets, setSets] = React.useState(
    exercise.setOrder.map((setId) => exercise.sets[setId]),
  );

  const [checked, setChecked] = React.useState({
    reps: exercise.types.reps,
    time: exercise.types.time,
  });

  const [exerciseName, setExerciseName] = React.useState(exercise.name);
  const [muscleGroups, setMuscleGroups] = React.useState(exercise.muscleGroups);

  return {
    exerciseId,
    sets,
    setSets,
    checked,
    setChecked,
    exerciseName,
    setExerciseName,
    muscleGroups,
    setMuscleGroups,
  };
};

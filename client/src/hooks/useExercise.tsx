import React from "react";
import {
  exerciseType,
  exerciseTypes,
  workoutType,
} from "../components/workout/workoutData";

export const useExercise = (
  exercise: exerciseType,
  workout: workoutType,
  setWorkout: (workout: workoutType) => void,
) => {
  const [checked, setChecked] = React.useState({
    reps: exercise.types.reps,
    time: exercise.types.time,
  });

  const [exerciseName, setExerciseName] = React.useState(exercise.name);
  const [muscleGroups, setMuscleGroups] = React.useState(exercise.muscleGroups);

  // Update type of exercise
  const updateExerciseTypes = (types: exerciseTypes) => {
    setChecked({ ...types });

    const newExercise = structuredClone(exercise);
    newExercise.types = types;

    const newWorkout = {
      ...workout,
      exercises: {
        ...workout.exercises,
        [exercise.id]: {
          ...newExercise,
        },
      },
    };

    setWorkout(newWorkout);
  };

  // Update exercise name and musclegroups
  const updateExercise = (newName: string, newMuscleGroups: string[]) => {
    setExerciseName(newName);
    setMuscleGroups(newMuscleGroups);

    const newExercise = structuredClone(exercise);
    newExercise.name = newName;
    newExercise.muscleGroups = newMuscleGroups;

    const newWorkout = {
      ...workout,
      exercises: {
        ...workout.exercises,
        [exercise.id]: {
          ...newExercise,
        },
      },
    };

    setWorkout(newWorkout);
  };

  // Delete exercise
  const deleteExercise = () => {
    const newExercises = structuredClone(workout.exercises);
    delete newExercises[exercise.id];

    const newExerciseOrder = Array.from(workout.exerciseOrder);
    const exerciseIndex = newExerciseOrder.indexOf(exercise.id);
    newExerciseOrder.splice(exerciseIndex, 1);

    const newWorkout = {
      ...workout,
      exercises: {
        ...newExercises,
      },
      exerciseOrder: newExerciseOrder,
    };

    setWorkout(newWorkout);
  };

  // Create set
  const createSet = () => {
    const newSetId = `set-${exercise.setCount + 1}`;

    const newSets = {
      [newSetId]: {
        id: newSetId,
        values: {
          weight: 0,
          reps: 0,
          time: 0,
        },
      },
    };

    const newWorkout = {
      ...workout,
      exercises: {
        ...workout.exercises,
        [exercise.id]: {
          ...exercise,
          setCount: exercise.setCount + 1,
          setOrder: [newSetId],
          sets: newSets,
        },
      },
    };

    setWorkout(newWorkout);
  };

  return {
    checked,
    exerciseName,
    muscleGroups,
    updateExerciseTypes,
    updateExercise,
    deleteExercise,
    createSet,
  };
};

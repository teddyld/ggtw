import React from "react";

import {
  exerciseType,
  setType,
  workoutType,
} from "../components/workout/workoutData";

export const useSet = (
  exercise: exerciseType,
  workout: workoutType,
  setWorkout: (workout: workoutType, message: string) => Promise<void>,
) => {
  const [edit, setEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Delete setId
  const deleteSet = (setId: string) => {
    const newSetOrder = Array.from(exercise.setOrder);
    const setIndex = newSetOrder.indexOf(setId);
    newSetOrder.splice(setIndex, 1);

    const newSets = structuredClone(exercise.sets);
    delete newSets[setId];

    const newWorkout = {
      ...workout,
      exercises: {
        ...workout.exercises,
        [exercise.id]: {
          ...exercise,
          sets: newSets,
          setOrder: newSetOrder,
        },
      },
    };

    setWorkout(newWorkout, "");
  };

  // Add set below setId
  const addSetBelow = (setId: string) => {
    const newSetId = `set-${exercise.setCount + 1}`;

    const newSetOrder = Array.from(exercise.setOrder);
    const setIndex = newSetOrder.indexOf(setId);
    newSetOrder.splice(setIndex + 1, 0, newSetId);

    const newSets = {
      ...exercise.sets,
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
          setOrder: newSetOrder,
          sets: newSets,
        },
      },
    };

    setWorkout(newWorkout, "");
  };

  // Update set values
  const updateSetValues = (newSets: setType[]) => {
    const newSetsObj: exerciseType["sets"] = {};
    for (const set of newSets) {
      newSetsObj[set.id] = set;
    }

    const newWorkout = {
      ...workout,
      exercises: {
        ...workout.exercises,
        [exercise.id]: {
          ...exercise,
          sets: newSetsObj,
        },
      },
    };

    setLoading(true);
    setWorkout(newWorkout, "Set updated").then(() => {
      setLoading(false);
      setEdit(false);
    });
  };

  return {
    edit,
    setEdit,
    loading,
    deleteSet,
    addSetBelow,
    updateSetValues,
  };
};

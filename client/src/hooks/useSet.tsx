import {
  exerciseType,
  setInputTypes,
  workoutType,
} from "../components/workout/workoutData";

export const useSet = (
  exercise: exerciseType,
  workout: workoutType,
  setWorkout: (workout: workoutType, message: string) => void,
) => {
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
        logged: false,
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

  // Update setId value of type with newValue
  const updateSetValue = (
    setId: string,
    newValue: number,
    type: setInputTypes,
  ) => {
    const newSets = structuredClone(exercise.sets);

    // Return if type value is the same as newValue
    const newSet = newSets[setId];
    if (newSet.values[type] === newValue) return;

    newSet.values[type] = newValue;

    const newWorkout = {
      ...workout,
      exercises: {
        ...workout.exercises,
        [exercise.id]: {
          ...exercise,
          sets: {
            ...exercise.sets,
            [setId]: newSet,
          },
        },
      },
    };

    setWorkout(newWorkout, "");
  };

  return {
    deleteSet,
    addSetBelow,
    updateSetValue,
  };
};

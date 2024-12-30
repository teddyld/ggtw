import {
  programState,
  workoutState,
  setType,
  setInputTypes,
  exerciseTypes,
} from "../components/workout/workoutData";

export const useWorkout = (
  workout: workoutState,
  program: programState,
  setProgram: (program: programState) => Promise<void>,
) => {
  const workoutIndex = program.findIndex((item) => item === workout);

  const updateSetValue = (
    exerciseId: string,
    setId: string,
    newValue: number,
    type: setInputTypes,
  ) => {
    const targetExercise = workout.exercises[exerciseId];
    const newSets = structuredClone(targetExercise.sets);

    // Return if type value is the same as newValue
    const newSet = newSets[setId];
    if (newSet.values[type] === newValue) return;

    newSet.values[type] = newValue;

    const newWorkout = {
      ...workout,
      exercises: {
        ...workout.exercises,
        [exerciseId]: {
          ...targetExercise,
          sets: {
            ...targetExercise.sets,
            [setId]: newSet,
          },
        },
      },
    };

    const newProgram = Array.from(program);
    newProgram[workoutIndex] = newWorkout;
    setProgram(newProgram);
  };

  const deleteSet = (
    exerciseId: string,
    setId: string,
    setSets: (value: React.SetStateAction<setType[]>) => void,
  ) => {
    const targetExercise = workout.exercises[exerciseId];

    const newSetOrder = Array.from(targetExercise.setOrder);
    const setIndex = newSetOrder.indexOf(setId);
    newSetOrder.splice(setIndex, 1);

    const newSets = structuredClone(targetExercise.sets);
    delete newSets[setId];

    const newWorkout = {
      ...workout,
      exercises: {
        ...workout.exercises,
        [exerciseId]: {
          ...targetExercise,
          sets: newSets,
          setOrder: newSetOrder,
        },
      },
    };

    // Update sets on client state
    setSets([...Object.values(newSets)]);

    const newProgram = Array.from(program);
    newProgram[workoutIndex] = newWorkout;
    setProgram(newProgram);
  };

  const addBelowSet = (
    exerciseId: string,
    setId: string,
    setSets: (value: React.SetStateAction<setType[]>) => void,
  ) => {
    const targetExercise = workout.exercises[exerciseId];
    const newSetId = `set-${targetExercise.setCount + 1}`;

    const newSetOrder = Array.from(targetExercise.setOrder);
    const setIndex = newSetOrder.indexOf(setId);
    newSetOrder.splice(setIndex + 1, 0, newSetId);

    const newSets = {
      ...targetExercise.sets,
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
        [exerciseId]: {
          ...targetExercise,
          setCount: targetExercise.setCount + 1,
          setOrder: newSetOrder,
          sets: newSets,
        },
      },
    };

    // Update sets on client state
    setSets([...Object.values(newSets)]);

    const newProgram = Array.from(program);
    newProgram[workoutIndex] = newWorkout;
    setProgram(newProgram);
  };

  const createSet = (
    exerciseId: string,
    setSets: (value: React.SetStateAction<setType[]>) => void,
  ) => {
    const targetExercise = workout.exercises[exerciseId];
    const newSetId = `set-${targetExercise.setCount + 1}`;

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
        [exerciseId]: {
          ...targetExercise,
          setCount: targetExercise.setCount + 1,
          setOrder: [newSetId],
          sets: newSets,
        },
      },
    };

    // Update sets on client state
    setSets([...Object.values(newSets)]);

    const newProgram = Array.from(program);
    newProgram[workoutIndex] = newWorkout;
    setProgram(newProgram);
  };

  const updateSetType = (exerciseId: string, types: exerciseTypes) => {
    const newExercise = structuredClone(workout.exercises[exerciseId]);
    newExercise.types = types;

    const newWorkout = {
      ...workout,
      exercises: {
        ...workout.exercises,
        [exerciseId]: newExercise,
      },
    };

    const newProgram = Array.from(program);
    newProgram[workoutIndex] = newWorkout;
    setProgram(newProgram);
  };

  const updateExerciseDetails = (
    exerciseId: string,
    newName: string,
    newMuscleGroups: string[],
  ) => {
    const newExercise = structuredClone(workout.exercises[exerciseId]);
    newExercise.name = newName;
    newExercise.muscleGroups = newMuscleGroups;
    const newWorkout = {
      ...workout,
      exercises: {
        ...workout.exercises,
        [exerciseId]: newExercise,
      },
    };

    const newProgram = Array.from(program);
    newProgram[workoutIndex] = newWorkout;
    setProgram(newProgram);
  };

  const deleteExercise = (exerciseId: string) => {
    const newExercises = structuredClone(workout.exercises);
    delete newExercises[exerciseId];

    const newExerciseOrder = Array.from(workout.exerciseOrder);
    const exerciseIndex = newExerciseOrder.indexOf(exerciseId);
    newExerciseOrder.splice(exerciseIndex, 1);

    const newWorkout = {
      ...workout,
      exercises: newExercises,
      exerciseOrder: newExerciseOrder,
      exerciseCount: workout.exerciseCount - 1,
    };

    const newProgram = Array.from(program);
    newProgram[workoutIndex] = newWorkout;
    setProgram(newProgram);
  };

  const createExercise = () => {
    const newExerciseId = `exercise-${workout.exerciseCount + 1}`;
    const newExercises = {
      ...workout.exercises,
      [newExerciseId]: {
        id: newExerciseId,
        name: "New Exercise",
        muscleGroups: [],
        types: { reps: true, time: false },
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
    };

    const newWorkout = {
      ...workout,
      exercises: newExercises,
      exerciseCount: workout.exerciseCount + 1,
      exerciseOrder: [...workout.exerciseOrder, newExerciseId],
    };

    const newProgram = Array.from(program);
    newProgram[workoutIndex] = newWorkout;
    setProgram(newProgram);
  };

  const deleteWorkout = () => {
    const newProgram = Array.from(program);
    newProgram.splice(workoutIndex, 1);
    setProgram(newProgram);
  };

  const renameWorkout = (newName: string) => {
    const newWorkout = {
      ...workout,
      name: newName,
    };

    const newProgram = Array.from(program);
    newProgram[workoutIndex] = newWorkout;
    setProgram(newProgram);
  };

  return {
    updateSetValue,
    deleteSet,
    addBelowSet,
    createSet,
    updateSetType,
    updateExerciseDetails,
    deleteExercise,
    createExercise,
    deleteWorkout,
    renameWorkout,
  };
};

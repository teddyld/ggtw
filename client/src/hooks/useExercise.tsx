import React from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

import { exerciseType, workoutType } from "../components/workout/workoutData";
import { logType, logValueType } from "../components/statistics/statisticsData";
import { useAppSelector } from "../store";

// Get the current date in the format dd/mm/yyyy
export const getCurrentDate = () => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

export const useExercise = (
  exercise: exerciseType,
  workout: workoutType,
  setWorkout: (workout: workoutType, message: string) => Promise<void>,
) => {
  const userId = useAppSelector((state) => state.user.id);

  const setLog = async (logData: logType) => {
    await axios.put("user/statistics/log", { userId, logData });
  };

  const logs: Record<string, boolean> = {};
  for (const set of Object.values(exercise.sets)) {
    logs[set.id] = false;
  }
  const [logged, setLogged] = React.useState(logs);
  const [playAnimation, setPlayAnimation] = React.useState(false);

  React.useEffect(() => {
    if (playAnimation) {
      setTimeout(() => {
        // Clear client logged status
        const newLogged = structuredClone(logged);
        for (const setId in newLogged) {
          newLogged[setId] = false;
        }
        setLogged(newLogged);
        setPlayAnimation(false);

        const today = getCurrentDate();
        notifications.show({ message: `Set logged on ${today}` });
      }, 300); // 0.3 second layout transition delay
    }
  }, [playAnimation]);

  // Update type of exercise
  const updateExerciseTypes = (types: exerciseType["types"]) => {
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

    setWorkout(newWorkout, "");
  };

  // Update exercise name and musclegroups
  const updateExercise = (
    newName: string,
    newMuscleGroups: string[],
    close: () => void,
  ) => {
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

    setWorkout(newWorkout, "Exercise updated successfully.").then(() => {
      close();
    });
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

    setWorkout(newWorkout, "Exercise deleted successfully.");
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

    setWorkout(newWorkout, "");
  };

  const getLoggedSets = (setIds: string[], units: exerciseType["units"]) => {
    const sets = [];
    for (const setId of setIds) {
      const setValues = exercise.sets[setId].values;
      const values: logValueType = { weight: setValues.weight, units };

      // Add values which are types of the exercise
      if (exercise.types.reps) {
        values["reps"] = setValues.reps;
      }

      if (exercise.types.time) {
        values["time"] = setValues.time;
      }

      sets.push(values);
    }

    return sets;
  };

  // Logs all of this exercises' sets
  const logAllSets = () => {
    // Update client logged status
    const unloggedSetIds = [];
    const newLogged = structuredClone(logged);
    for (const setId in newLogged) {
      if (!newLogged[setId]) {
        newLogged[setId] = true;
        unloggedSetIds.push(setId);
      }
    }
    setLogged(newLogged);
    setPlayAnimation(true);

    // Log all sets which are unlogged
    const today = getCurrentDate();
    const sets = getLoggedSets(unloggedSetIds, exercise.units);

    const logData = {
      exerciseName: exercise.name,
      muscleGroups: exercise.muscleGroups,
      sets: sets,
      date: today,
    };
    setLog(logData);
  };

  // Log a single selected set
  const logSet = (setId: string) => {
    // Update client logged status
    const newLogged = structuredClone(logged);
    newLogged[setId] = true;
    setLogged(newLogged);
    setPlayAnimation(true);

    // Log current set
    const today = getCurrentDate();
    const sets = getLoggedSets([setId], exercise.units);

    const logData = {
      exerciseName: exercise.name,
      muscleGroups: exercise.muscleGroups,
      sets: sets,
      date: today,
    };

    setLog(logData);

    // Arrange selected set to the end of the order
    const newSetOrder = Array.from(exercise.setOrder);
    const index = newSetOrder.indexOf(setId);
    newSetOrder.push(newSetOrder.splice(index, 1)[0]);

    const newWorkout = {
      ...workout,
      lastAccessed: getCurrentDate(),
      exercises: {
        ...workout.exercises,
        [exercise.id]: {
          ...exercise,
          setOrder: [...newSetOrder],
        },
      },
    };

    setWorkout(newWorkout, "");
  };

  const changeExerciseUnits = (value: exerciseType["units"]) => {
    const newWorkout = {
      ...workout,
      exercises: {
        ...workout.exercises,
        [exercise.id]: {
          ...exercise,
          units: value,
        },
      },
    };

    setWorkout(newWorkout, "");
  };

  return {
    logged,
    updateExerciseTypes,
    updateExercise,
    deleteExercise,
    createSet,
    logAllSets,
    logSet,
    changeExerciseUnits,
  };
};

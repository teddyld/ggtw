import React from "react";
import { useUser as useClerkUser } from "@clerk/clerk-react";

import { useAppSelector, useAppDispatch } from "../store";
import {
  setUserId,
  setWorkout,
  deleteWorkout,
} from "../store/userReducer";
import { workoutType } from "../components/workout/workoutData";

export const useWorkout = () => {
  const dispatch = useAppDispatch();

  const id = useAppSelector((state) => state.user.id);
  const { user, isSignedIn, isLoaded } = useClerkUser();

  // Set user id from the User object from Clerk
  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      dispatch(setUserId(user?.id));
    }
  }, [isLoaded, isSignedIn]);

  const handleSetWorkout = (workout: workoutType, message: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        dispatch(setWorkout({ userId: id, workout, message }));
        resolve();
      } catch (_) {
        reject();
      }
    });
  };

  const handleDeleteWorkout = (workoutId: string) => {
    dispatch(deleteWorkout({ userId: id, workoutId }));
  };

  return {
    id,
    setWorkout: handleSetWorkout,
    deleteWorkout: handleDeleteWorkout,
  };
};

import React from "react";
import axios from "axios";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

import { useAppSelector, useAppDispatch } from "../store";
import {
  setUserId,
  setUserWorkouts,
  setWorkout,
  deleteWorkout,
} from "../store/userReducer";
import { workoutType } from "../components/workout/workoutData";

export const useWorkout = () => {
  const dispatch = useAppDispatch();

  const id = useAppSelector((state) => state.user.id);
  const { user, isSignedIn, isLoaded } = useClerkUser();

  const userWorkouts = useAppSelector((state) => state.user.userWorkouts);

  const { isPending, data } = useQuery({
    queryKey: ["workouts", id],
    queryFn: () => axios.get(`/user/workouts/${id}`).then((res) => res.data),
    enabled: !!id, // Only run when id is valid
  });

  // Set user's workout from MongoDB
  React.useEffect(() => {
    if (data && data.workouts) {
      dispatch(setUserWorkouts(Object.values(data.workouts)));
    } else {
      dispatch(setUserWorkouts([]));
    }
  }, [isPending, data]);

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
    userWorkouts,
    workoutPending: isPending,
    setWorkout: handleSetWorkout,
    deleteWorkout: handleDeleteWorkout,
  };
};

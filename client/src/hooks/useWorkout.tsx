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
  const userWorkouts = useAppSelector((state) => state.user.userWorkouts);

  const { user, isSignedIn, isLoaded } = useClerkUser();

  const { isPending, data } = useQuery({
    queryKey: ["workouts", id],
    queryFn: () => axios.get(`/user/workouts/${id}`).then((res) => res.data),
    enabled: !!id, // Only run the query if the id is set
  });

  // Set user id from the User object from Clerk
  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      dispatch(setUserId(user?.id));
    }
  }, [isLoaded, isSignedIn]);

  // Set user's program from MongoDB on initial load
  React.useEffect(() => {
    if (data && data.workouts) {
      dispatch(setUserWorkouts(Object.values(data.workouts)));
    } else {
      dispatch(setUserWorkouts([]));
    }
  }, [isPending]);

  const handleSetWorkout = (workout: workoutType) => {
    dispatch(setWorkout({ userId: id, workout }));
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

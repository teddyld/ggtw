import React from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../store";
import { setStoreId, setStoreProgram } from "../store/userReducer";
import { programState, backWorkout } from "../components/workout/workoutData";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export const useProgram = () => {
  const dispatch = useAppDispatch();

  const id = useAppSelector((state) => state.user.id);
  const program = useAppSelector((state) => state.user.program);

  const { user, isSignedIn, isLoaded } = useClerkUser();

  const { isPending, data } = useQuery({
    queryKey: ["program", id],
    queryFn: () => axios.get(`/user/program/${id}`).then((res) => res.data),
    enabled: !!id, // Only run the query if the id is set
  });

  // Set user id from the User object from Clerk
  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      dispatch(setStoreId(user?.id));
    }
  }, [isLoaded, isSignedIn]);

  // Update program in MongoDB
  const setProgram = async (program: programState) => {
    await axios.put("/user/program/update", { id, program });
    dispatch(setStoreProgram(program));
  };

  // Set user's program from MongoDB on initial load
  React.useEffect(() => {
    if (data && data.program.length > 0) {
      dispatch(setStoreProgram(data.program));
    } else {
      dispatch(setStoreProgram([backWorkout]));
    }
  }, [isPending]);

  return {
    program,
    setProgram,
    programPending: isPending,
  };
};

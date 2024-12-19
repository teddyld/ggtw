import React from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../store";
import {
  setStoreId,
  setStoreSession,
  sessionState,
} from "../store/userReducer";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.user.id);
  const session = useAppSelector((state) => state.user.session);

  const { user, isSignedIn, isLoaded } = useClerkUser();

  const mutation = useMutation({
    mutationFn: (id: string) =>
      axios.get(`/user/session/${id}`).then((res) => res.data),
  });

  // Set user id from the User object from Clerk
  React.useEffect(() => {
    const fetchSession = async (id: string) => {
      try {
        const data = await mutation.mutateAsync(id);
        setSession(data.session);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    if (isSignedIn) {
      dispatch(setStoreId(user?.id));
      fetchSession(user?.id);
    }
  }, [isLoaded]);

  const setSession = (session: sessionState) => {
    dispatch(setStoreSession(session));
  };

  return {
    id,
    session,
    setSession,
    sessionPending: mutation.isPending,
  };
};

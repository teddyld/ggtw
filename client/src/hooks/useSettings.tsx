import React from "react";
import axios from "axios";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

import { useAppSelector, useAppDispatch } from "../store";
import {
  setUserId,
  updateSettings as _updateSettings,
} from "../store/userReducer";

import { settingsType } from "../components/settings/settingsData";

export const useSettings = () => {
  const dispatch = useAppDispatch();

  const id = useAppSelector((state) => state.user.id);
  const { user, isSignedIn, isLoaded } = useClerkUser();

  const { isPending, data } = useQuery({
    queryKey: ["settings", id],
    queryFn: () => axios.get(`/user/settings/${id}`).then((res) => res.data),
    enabled: !!id, // Only run when id is valid
  });

  // Set user id from the User object from Clerk
  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      dispatch(setUserId(user?.id));
    }
  }, [isLoaded, isSignedIn]);

  const updateSettings = async (settings: settingsType) => {
    dispatch(_updateSettings({ userId: id, settings }));
  };

  return {
    userSettings: !isPending ? (data.settings as settingsType) : null,
    settingsPending: isPending,
    updateSettings,
  };
};

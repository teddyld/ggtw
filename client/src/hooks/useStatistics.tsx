import React from "react";
import axios from "axios";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

import { useAppSelector, useAppDispatch } from "../store";
import { setUserId } from "../store/userReducer";
import { statisticsType } from "../components/statistics/statisticsData";

export const useStatistics = () => {
  const dispatch = useAppDispatch();

  const id = useAppSelector((state) => state.user.id);
  const { user, isSignedIn, isLoaded } = useClerkUser();

  const { isPending, data } = useQuery({
    queryKey: ["statistics", id],
    queryFn: () => axios.get(`/user/statistics/${id}`).then((res) => res.data),
    enabled: !!id, // Only run when id is valid
  });

  // Set user id from the User object from Clerk
  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      dispatch(setUserId(user?.id));
    }
  }, [isLoaded, isSignedIn]);

  return {
    userStatistics: !isPending ? (data.statistics as statisticsType) : null,
    statisticsPending: isPending,
  };
};

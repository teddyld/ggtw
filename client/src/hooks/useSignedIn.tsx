import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

export const useSignedIn = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigate to Dashboard if signed in else /workout route
  const handleSignedIn = () => {
    if (!isSignedIn) {
      navigate("/");
    } else if (location.pathname === "/") {
      navigate("/workout");
    }
  };

  React.useEffect(() => {
    if (isLoaded) {
      handleSignedIn();
    }
  }, [isSignedIn, isLoaded]);

  return { handleSignedIn };
};

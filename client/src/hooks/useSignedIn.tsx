import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const useSignedIn = () => {
  const { isSignedIn } = useUser()
  const navigate = useNavigate()
  
  // Navigate to Dashboard if signed in else /workout route
  const handleSignedIn = () => {
    if (!isSignedIn) {
      navigate("/")
    } else {
      navigate("/workout")
    }
  }

  React.useEffect(() => {
    handleSignedIn()
  }, [isSignedIn])

  return { handleSignedIn }
}
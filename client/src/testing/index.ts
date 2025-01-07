export { setupRender } from "./setupRender";
export { RouterWrapper } from "./setupRouter";
export * from "@testing-library/react";

// Mock the useUser hook in Clerk
vi.mock("@clerk/clerk-react", async () => {
  const actual = await vi.importActual("@clerk/clerk-react");

  let useUser = () => {
    return { isSignedIn: true };
  };

  return {
    ...actual,
    useUser,
  };
});

export const mockExercise = {
  id: "exercise-1",
  name: "Example",
  muscleGroups: [],
  types: {
    reps: true,
    time: true,
  },
  setOrder: [],
  setCount: 0,
  sets: {}
}
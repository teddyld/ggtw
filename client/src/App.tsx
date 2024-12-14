import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./axios.ts";

import Workout from "./pages/Workout.tsx";
import Program from "./pages/Program.tsx";
import Statistics from "./pages/Statistics.tsx";
import Profile from "./pages/Profile.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Workout />,
  },
  {
    path: "/program",
    element: <Program />,
  },
  {
    path: "/statistics",
    element: <Statistics />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

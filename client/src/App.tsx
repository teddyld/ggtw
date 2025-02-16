import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./axios.ts";

import WorkoutPage from "./pages/WorkoutPage.tsx";
import StatisticsPage from "./pages/StatisticsPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Workout from "./components/workout/Workout.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/workout",
    element: <WorkoutPage />,
  },
  {
    path: "/workout/:name/:id",
    element: <Workout />,
  },
  {
    path: "/statistics",
    element: <StatisticsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
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

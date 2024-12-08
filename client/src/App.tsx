import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./axios.ts";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <>ggtw</>,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;

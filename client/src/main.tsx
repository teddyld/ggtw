import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { ClerkProvider } from "@clerk/clerk-react";
import { MantineProvider } from "@mantine/core";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/index.ts";
import { theme } from "./mantineTheme.ts";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ReduxProvider store={store}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <App />
        </MantineProvider>
      </ReduxProvider>
    </ClerkProvider>
  </React.StrictMode>,
);

import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextThemesProvider attribute="class" defaultTheme="light">
      <App />
    </NextThemesProvider>
  </StrictMode>,
);

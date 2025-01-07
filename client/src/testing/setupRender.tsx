import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MantineProvider } from "@mantine/core";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "../store";
import { theme } from "../mantineTheme";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

export function setupRender(ui: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(<>{ui}</>, {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <ReduxProvider store={store}>
            <MantineProvider theme={theme}>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MantineProvider>
          </ReduxProvider>
        </ClerkProvider>
      ),
    }),
  };
}

import { setupRender, screen } from "../../testing";
import { Routes, Route, MemoryRouter } from "react-router-dom";

import NavBar from "./NavBar";
import { AppShell } from "@mantine/core";

describe("NavBar component", () => {
  it("Collapses sidebar", async () => {
    const toggleFn = vi.fn();
    const { user } = setupRender(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <AppShell>
                <NavBar opened={true} toggle={toggleFn} />
              </AppShell>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const collapseSidebar = screen.getByRole("button", {
      name: /Collapse sidebar/i,
    });
    await user.click(collapseSidebar);

    expect(toggleFn).toHaveBeenCalledOnce();
  });

  it("Expands sidebar", async () => {
    const toggleFn = vi.fn();
    const { user } = setupRender(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <AppShell>
                <NavBar opened={false} toggle={toggleFn} />
              </AppShell>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const expandSidebar = screen.getByRole("button", {
      name: /Expand sidebar/i,
    });
    await user.click(expandSidebar);

    expect(toggleFn).toHaveBeenCalledOnce();
  });
});

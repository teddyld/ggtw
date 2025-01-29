import { setupRender, screen, waitFor } from "../../testing";

import SetMenu from "./SetMenu";

describe("SetMenu component", () => {
  it("deletes set when menu item is clicked", async () => {
    const deleteSetFn = vi.fn();
    const { user } = setupRender(
      <SetMenu deleteSet={deleteSetFn} addSetBelow={() => {}} />,
    );

    // Open menu dropdown
    const menuBtn = screen.getByRole("button", { name: /edit set/i });
    await user.click(menuBtn);

    // Wait for dropdown to appear
    await waitFor(async () => {
      const deleteBtn = screen.getByRole("menuitem", {
        name: /delete set/i,
      });

      // Delete set
      await user.click(deleteBtn);
      expect(deleteSetFn).toHaveBeenCalledOnce();
    });
  });

  it("adds set below when menu item is clicked", async () => {
    const addSetBelowFn = vi.fn();
    const { user } = setupRender(
      <SetMenu deleteSet={() => {}} addSetBelow={addSetBelowFn} />,
    );

    // Open menu dropdown
    const menuBtn = screen.getByRole("button", { name: /edit set/i });
    await user.click(menuBtn);

    // Wait for dropdown to appear
    await waitFor(async () => {
      const addBtn = screen.getByRole("menuitem", {
        name: /add set below/i,
      });

      // Add set
      await user.click(addBtn);
      expect(addSetBelowFn).toHaveBeenCalledOnce();
    });
  });
});

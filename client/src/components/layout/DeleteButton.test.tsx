import { setupRender, screen } from "../../testing";

import DeleteButton from "./DeleteButton";

describe("DeleteButton component", () => {
  it("renders item name as string in component", () => {
    setupRender(<DeleteButton item="exercise" handleDelete={() => {}} />);
    expect(screen.queryAllByText(/Delete exercise/i).length).toBeGreaterThan(0);
  });

  it("opens delete card when delete button is clicked", async () => {
    const { user } = setupRender(
      <DeleteButton item="workout" handleDelete={() => {}} />,
    );

    const deleteCard = screen.getByTestId("deleteCard");
    expect(deleteCard).toHaveAttribute("aria-hidden", "true");

    // Display delete card
    const deleteBtn = screen.getByRole("button", {
      name: /Delete workout/i,
    });
    await user.click(deleteBtn);

    expect(deleteCard).toHaveAttribute("aria-hidden", "false");
  });

  it("calls handleDelete when delete confirmation button is clicked", async () => {
    const deleteFn = vi.fn();
    const { user } = setupRender(
      <DeleteButton item="workout" handleDelete={deleteFn} />,
    );

    // Display delete card
    const deleteBtn = screen.getAllByRole("button", {
      name: /Delete workout/i,
    })[0];

    await user.click(deleteBtn);

    const deleteConfirm = screen.getAllByRole("button", {
      name: /Delete workout/i,
    })[1];

    // Click confirm delete button
    await user.click(deleteConfirm);
    // screen.debug()
    expect(deleteFn).toHaveBeenCalledOnce();
  });
});

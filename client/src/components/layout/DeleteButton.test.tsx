import { setupRender, screen } from "../../testing";

import DeleteButton from "./DeleteButton";

describe("DeleteButton component", () => {
  it("renders item name as string in component", () => {
    setupRender(
      <DeleteButton item="exercise" handleDelete={() => {}} disabled={false} />,
    );
    expect(screen.queryAllByText(/Delete exercise/i).length).toBeGreaterThan(0);
  });

  it("opens delete card when delete button is clicked", async () => {
    const { user } = setupRender(
      <DeleteButton item="workout" handleDelete={() => {}} disabled={false} />,
    );

    const deleteCard = screen.getByTestId("deleteCard");
    expect(deleteCard).toHaveAttribute("aria-hidden", "true");

    // Display delete card
    const deleteBtn = screen.getByRole("button", {
      name: /delete workout/i,
    });
    await user.click(deleteBtn);

    expect(deleteCard).toHaveAttribute("aria-hidden", "false");
  });

  it("calls handleDelete when delete confirmation button is clicked", async () => {
    const deleteFn = vi.fn();
    const { user } = setupRender(
      <DeleteButton item="workout" handleDelete={deleteFn} disabled={false} />,
    );

    // Display delete card
    const deleteBtn = screen.getAllByRole("button", {
      name: /delete workout/i,
    })[0];

    await user.click(deleteBtn);

    const deleteConfirm = screen.getAllByRole("button", {
      name: /delete workout/i,
    })[1];

    // Click confirm delete button
    await user.click(deleteConfirm);

    expect(deleteFn).toHaveBeenCalledOnce();
  });

  it("disables delete buttons when disabled is asserted", () => {
    setupRender(
      <DeleteButton item="workout" handleDelete={() => {}} disabled={true} />,
    );

    const deleteBtn = screen.getAllByRole("button", {
      name: /delete workout/i,
    })[0];

    expect(deleteBtn).toHaveAttribute("data-disabled", "true");
  });
});

import { setupRender, screen, RouterWrapper } from "../../testing";

import DeleteButton from "./DeleteButton";

describe("DeleteButton component", () => {
  it("renders item name as string in component", () => {
    setupRender(
      <RouterWrapper>
        <DeleteButton
          item="exercise"
          handleDelete={() => {}}
          disabled={false}
        />
      </RouterWrapper>,
    );
    expect(screen.queryAllByText(/Delete exercise/i).length).toBeGreaterThan(0);
  });

  it("calls handleDelete when delete confirmation button is clicked", async () => {
    const deleteFn = vi.fn();
    const { user } = setupRender(
      <RouterWrapper>
        <DeleteButton item="workout" handleDelete={deleteFn} disabled={false} />
      </RouterWrapper>,
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
      <RouterWrapper>
        <DeleteButton item="workout" handleDelete={() => {}} disabled={true} />
      </RouterWrapper>,
    );

    const deleteBtn = screen.getAllByRole("button", {
      name: /delete workout/i,
    })[0];

    expect(deleteBtn).toHaveAttribute("data-disabled", "true");
  });
});

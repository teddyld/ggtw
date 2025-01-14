import { setupRender, screen } from "../../testing";

import WorkoutNewModal from "./WorkoutNewModal";

describe("WorkoutNewModal component", () => {
  it("closes when close function is called", async () => {
    const closeFn = vi.fn();
    const setWorkoutFn = vi.fn(() => Promise.resolve());
    const { user } = setupRender(
      <WorkoutNewModal
        opened={true}
        close={closeFn}
        setWorkout={setWorkoutFn}
      />,
    );

    expect(screen.getByRole("dialog")).toBeTruthy();

    // Close with cancel button
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelBtn);
    expect(closeFn).toHaveBeenCalledOnce();
  });

  it("is closed when opened is false", () => {
    const setWorkoutFn = vi.fn(() => Promise.resolve());
    setupRender(
      <WorkoutNewModal
        opened={false}
        close={() => {}}
        setWorkout={setWorkoutFn}
      />,
    );

    expect(screen.queryByRole("dialog")).toBeFalsy();
  });

  it("calls setWorkout when create button is clicked", async () => {
    const setWorkoutFn = vi.fn(() => Promise.resolve());
    const { user } = setupRender(
      <WorkoutNewModal
        opened={true}
        close={() => {}}
        setWorkout={setWorkoutFn}
      />,
    );

    const nameInput = screen.getByRole("textbox", { name: /workout name/i });
    expect(nameInput).toHaveValue("");

    // Workout cannot be created if workout name is empty
    const createBtn = screen.getByRole("button", { name: /create/i });
    expect(createBtn).toHaveAttribute("data-disabled", "true");

    const newWorkoutName = "Workout";
    await user.type(nameInput, newWorkoutName);
    expect(nameInput).toHaveValue(newWorkoutName);

    await user.click(createBtn);
    await user.type(nameInput, "{enter}");

    expect(setWorkoutFn).toHaveBeenCalledTimes(2);
  });
});

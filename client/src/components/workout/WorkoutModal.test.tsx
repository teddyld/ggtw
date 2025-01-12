import { setupRender, screen } from "../../testing";

import WorkoutModal from "./WorkoutModal";

const workoutName = "Workout Example";

describe("WorkoutModal component", () => {
  it("closes when close function is called", async () => {
    const closeFn = vi.fn();
    const { user } = setupRender(
      <WorkoutModal
        name={workoutName}
        removeWorkout={() => {}}
        renameWorkout={() => {}}
        opened={true}
        close={closeFn}
      />,
    );
    expect(screen.getByRole("dialog")).toBeTruthy();

    // Close with cancel button
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelBtn);
    expect(closeFn).toHaveBeenCalledOnce();
  });

  it("is closed when opened is false", () => {
    setupRender(
      <WorkoutModal
        name={workoutName}
        removeWorkout={() => {}}
        renameWorkout={() => {}}
        opened={false}
        close={() => {}}
      />,
    );
    expect(screen.queryByRole("dialog")).toBeFalsy();
  });

  it("renames workout when save button is clicked with valid workout name", async () => {
    const renameWorkoutFn = vi.fn();
    const { user } = setupRender(
      <WorkoutModal
        name={workoutName}
        removeWorkout={() => {}}
        renameWorkout={renameWorkoutFn}
        opened={true}
        close={() => {}}
      />,
    );

    // Assert initial workout name
    const renameInput = screen.getByRole("textbox", { name: /workout name/i });
    expect(renameInput).toHaveValue(workoutName);

    await user.clear(renameInput);
    expect(renameInput).toHaveValue("");

    // Modify workout name
    const newName = "New workout";
    await user.type(renameInput, newName);
    expect(renameInput).toHaveValue(newName);

    // Save new workout name
    const saveBtn = screen.getByRole("button", { name: /save/i });
    await user.click(saveBtn);
    await user.type(renameInput, "{enter}")

    expect(renameWorkoutFn).toHaveBeenCalledTimes(2);
  });

  it("disables save button when workout name is invalid", async () => {
    const { user } = setupRender(
      <WorkoutModal
        name={workoutName}
        removeWorkout={() => {}}
        renameWorkout={() => {}}
        opened={true}
        close={() => {}}
      />,
    );

    // Assert initial workout name
    const renameInput = screen.getByRole("textbox", { name: /workout name/i });
    expect(renameInput).toHaveValue(workoutName);

    // Clear workout name
    await user.clear(renameInput);
    expect(renameInput).toHaveValue("");

    const saveBtn = screen.getByRole("button", { name: /save/i });
    expect(saveBtn).toHaveAttribute("data-disabled", "true");
  });
});

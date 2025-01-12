import { setupRender, screen, waitFor, act } from "../../testing";

import ExerciseModal from "./ExerciseModal";

const exerciseName = "Example";
const muscleGroups = ["Biceps", "Triceps"];

describe("ExerciseModal component", () => {
  it("closes when close function is called", async () => {
    const closeFn = vi.fn();
    const { user } = setupRender(
      <ExerciseModal
        exerciseName={exerciseName}
        muscleGroups={muscleGroups}
        updateExercise={() => {}}
        deleteExercise={() => {}}
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
      <ExerciseModal
        exerciseName={exerciseName}
        muscleGroups={muscleGroups}
        updateExercise={() => {}}
        deleteExercise={() => {}}
        opened={false}
        close={() => {}}
      />,
    );
    expect(screen.queryByRole("dialog")).toBeFalsy();
  });

  it("correctly displays exercise name and muscle groups and updates exercise details", async () => {
    const updateExerciseFn = vi.fn();
    const { user } = setupRender(
      <ExerciseModal
        exerciseName={exerciseName}
        muscleGroups={muscleGroups}
        updateExercise={updateExerciseFn}
        deleteExercise={() => {}}
        opened={true}
        close={() => {}}
      />,
    );

    // Validate current exercise name input
    const nameInput = screen.getByRole("textbox", { name: /exercise name/i });
    expect(nameInput).toHaveAttribute("value", exerciseName);

    // Clear exercise name
    await user.clear(nameInput);

    // Modify exercise name
    await user.type(nameInput, "New Exercise Name");
    await waitFor(() => {
      expect(nameInput).toHaveAttribute("value", "New Exercise Name");
    });

    // Validate current muscle groups input
    const muscleGroupsContent = screen.getByLabelText(/muscle groups input/i);

    for (const muscle of muscleGroups) {
      expect(muscleGroupsContent.textContent).toContain(muscle.toUpperCase());
    }

    // Add new muscle group
    const muscleGroupsInput = screen.getByRole("textbox", {
      name: /muscle groups/i,
    });

    const newMuscle = "Back";

    await user.type(muscleGroupsInput, newMuscle);

    await waitFor(() => {
      expect(muscleGroupsInput).toHaveValue(newMuscle);
    });

    await act(async () => {
      await user.type(muscleGroupsInput, "{enter}");
    });

    // Validate new muscle group containing newMuscle
    for (const muscle of [...muscleGroups, newMuscle]) {
      expect(muscleGroupsContent.textContent).toContain(muscle.toUpperCase());
    }

    // Update exercise details using "save" button
    const saveBtn = screen.getByRole("button", { name: /save/i });
    await user.click(saveBtn);

    expect(updateExerciseFn).toHaveBeenCalledOnce();
  });

  it("disables save button when exercise name is invalid", async () => {
    const { user } = setupRender(
      <ExerciseModal
        exerciseName={exerciseName}
        muscleGroups={muscleGroups}
        updateExercise={() => {}}
        deleteExercise={() => {}}
        opened={true}
        close={() => {}}
      />,
    );

    // Validate current exercise name input
    const nameInput = screen.getByRole("textbox", { name: /exercise name/i });
    expect(nameInput).toHaveAttribute("value", exerciseName);

    // Clear exercise name
    await user.clear(nameInput);

    const saveBtn = screen.getByRole("button", { name: /save/i });
    expect(saveBtn).toHaveAttribute("data-disabled", "true");
  });
});

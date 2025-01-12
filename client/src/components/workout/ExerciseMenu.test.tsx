import { setupRender, screen, waitFor } from "../../testing";

import ExerciseMenu from "./ExerciseMenu";

const checkedState = {
  reps: false,
  time: false,
};

describe("ExerciseMenu component", () => {
  it("opens a modal when open() is called", async () => {
    const openFn = vi.fn();
    const { user } = setupRender(
      <ExerciseMenu
        exerciseName="Exercise"
        checked={checkedState}
        open={openFn}
        updateExerciseTypes={() => {}}
      />,
    );

    // Open menu dropdown
    const menuBtn = screen.getByRole("button", { name: /Edit Exercise/i });
    await user.click(menuBtn);

    // Wait for dropdown to appear
    await waitFor(async () => {
      const editExerciseBtn = screen.getByRole("menuitem", {
        name: /Edit exercise details/i,
      });

      // Open exercise modal
      await user.click(editExerciseBtn);
      expect(openFn).toHaveBeenCalledOnce();
    });
  });

  it("checks reps and time when checkbox is clicked, updating exercise types", async () => {
    const updateExerciseTypesFn = vi.fn();
    const { user } = setupRender(
      <ExerciseMenu
        exerciseName="Exercise"
        checked={checkedState}
        open={() => {}}
        updateExerciseTypes={updateExerciseTypesFn}
      />,
    );

    // Open menu dropdown
    const menuBtn = screen.getByRole("button", { name: /Edit Exercise/i });
    await user.click(menuBtn);

    // Wait for dropdown to appear
    await waitFor(async () => {
      const repsCheckbox = screen.getByRole("checkbox", {
        name: /Reps checkbox/i,
      });
      const timeCheckbox = screen.getByRole("checkbox", {
        name: /Time checkbox/i,
      });
      expect(repsCheckbox).toBeTruthy();
      expect(timeCheckbox).toBeTruthy();

      // Call updateExerciseTypes by checking reps and time
      await user.click(repsCheckbox);
      await user.click(timeCheckbox);

      expect(updateExerciseTypesFn).toHaveBeenCalledTimes(2);
    });
  });
});

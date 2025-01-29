import { setupRender, screen } from "../../testing";

import SetInput from "./SetInput";

const initialValue = 10;

describe("SetInput component", () => {
  it("calls updateSetValue on set input blur", async () => {
    const updateSetValueFn = vi.fn();
    const { user } = setupRender(
      <SetInput
        initialValue={initialValue}
        setId="set-1"
        type="weight"
        updateSetValue={updateSetValueFn}
      />,
    );

    const setInput = screen.getByLabelText(/weight/);

    // Assert initial value of set input
    expect(setInput).toHaveValue(initialValue.toString());

    // Clear set input value
    await user.clear(setInput);
    expect(setInput).toHaveValue("");

    // Change set input value
    const newValue = 100;
    await user.type(setInput, newValue.toString());
    expect(setInput).toHaveValue(newValue.toString());

    // Blur set input
    await user.click(document.body);
    expect(updateSetValueFn).toHaveBeenCalledOnce();
  });
});

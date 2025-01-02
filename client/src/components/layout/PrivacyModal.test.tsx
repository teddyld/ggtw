import { setupRender, screen } from "../../testing";

import PrivacyModal from "./PrivacyModal";

describe("PrivacyModal component", () => {
  it("closes when close function is called", async () => {
    const closeFn = vi.fn();
    const { user } = setupRender(
      <PrivacyModal opened={true} close={closeFn} />,
    );
    const modal = screen.getByRole("dialog");
    expect(modal).toBeTruthy();

    // Close with button
    const closeBtn = screen.getAllByRole("button")[0];
    await user.click(closeBtn);
    expect(closeFn).toHaveBeenCalledTimes(1);
  });

  it("is closed when opened is false", () => {
    const closeFn = vi.fn();
    setupRender(<PrivacyModal opened={false} close={closeFn} />);
    expect(screen.queryByRole("dialog")).toBeFalsy();
  });
});

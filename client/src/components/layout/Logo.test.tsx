import { setupRender, RouterWrapper, screen } from "../../testing";

import Logo from "./Logo";

describe("Logo component", () => {
  it("navigates to /workout when logo is pressed and user is signed in", async () => {
    const { user } = setupRender(
      <RouterWrapper>
        <Logo opened={true} />
      </RouterWrapper>,
    );

    const logo = screen.getByRole("img", {
      name: /ggtw logo/i,
    });

    const logoText = screen.getByText(/ggtw/i);
    expect(logoText).toHaveAttribute("aria-hidden", "false");

    await user.click(logo);
    // Check navigation to workout route
    expect(screen.getByText("Workout")).toBeTruthy();
  });

  it("does not contain logo text when navbar is not opened", () => {
    setupRender(
      <RouterWrapper>
        <Logo opened={false} />
      </RouterWrapper>,
    );

    const logoText = screen.getByText(/ggtw/i);
    expect(logoText).toHaveAttribute("aria-hidden", "true");
  });
});

import { setupRender, screen } from "../../testing";

import NavBarFooter from "./NavBarFooter";

describe("NavBarFooter component", () => {
  it("navigates to GitHub", () => {
    setupRender(<NavBarFooter opened={true} />);

    const linkGithub = screen.getByLabelText("GitHub").parentElement;
    expect(linkGithub).toHaveAttribute(
      "href",
      "https://github.com/teddyld/ggtw",
    );
  });

  it("navigates to personal website", () => {
    setupRender(<NavBarFooter opened={true} />);
    const linkPersonal = screen.getByRole("link", { name: "Vincent Pham" });
    expect(linkPersonal).toHaveAttribute("href", "https://teddyld.github.io/");
  });

  it("toggles dark/light theme", async () => {
    const { user } = setupRender(<NavBarFooter opened={true} />);

    // Defaults to dark and changes to light
    const themeBtn = screen.getByRole("button", {
      name: /Change theme to light/i,
    });
    await user.click(themeBtn);

    expect(
      screen.getByRole("button", { name: /Change theme to dark/i }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: /Change theme to light/i }),
    ).toBeFalsy();

    // Change back to dark mode
    await user.click(themeBtn);
    expect(
      screen.getByRole("button", { name: /Change theme to light/i }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: /Change theme to dark/i }),
    ).toBeFalsy();
  });

  it("hides link to personal website when not opened", () => {
    setupRender(<NavBarFooter opened={false} />);
    const linkPersonal = screen.queryByRole("link", { name: /vincent pham/i });
    expect(linkPersonal).toBeFalsy();
  });
});

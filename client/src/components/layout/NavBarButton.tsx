import React from "react";
import { Button } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import clsx from "clsx";

import { pageType } from "../../pages/pageInfo";

type NavBarButtonType = {
  children: React.ReactNode;
  page: pageType;
};

const NavBarButton = (
  props: NavBarButtonType,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const { children, page } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const { isSignedIn } = useUser();

  return (
    <div ref={ref}>
      <Button
        variant="subtle"
        justify="flex-start"
        className={clsx(
          location.pathname === page.route ||
            (location.pathname.startsWith("/profile") &&
              page.route === "/profile")
            ? "bg-primary/10"
            : "",
          !isSignedIn && page.route === "/profile" ? "hidden" : "",
          "w-full",
        )}
        h={60}
        onClick={() => navigate(page.route)}
      >
        {children}
      </Button>
    </div>
  );
};

export default React.forwardRef<HTMLDivElement, NavBarButtonType>(NavBarButton);

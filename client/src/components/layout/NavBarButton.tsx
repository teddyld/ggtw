import React from "react";
import { Button } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

import { pageType } from "../../pages/pageInfo";
import { useMedia } from "../../hooks/useMedia";

type NavBarButtonType = {
  toggle: () => void;
  children: React.ReactNode;
  page: pageType;
};

const NavBarButton = (
  props: NavBarButtonType,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const { children, page, toggle } = props;

  const { isMobile } = useMedia();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    if (isMobile) {
      toggle();
    }
    navigate(route);
  };

  return (
    <div ref={ref}>
      <Button
        variant="subtle"
        justify="flex-start"
        className={clsx(
          location.pathname === page.route ? "bg-primary/10" : "",
          "w-full",
        )}
        h={60}
        onClick={() => handleNavigate(page.route)}
        aria-label={`${page.name} page button`}
      >
        {children}
      </Button>
    </div>
  );
};

export default React.forwardRef<HTMLDivElement, NavBarButtonType>(NavBarButton);

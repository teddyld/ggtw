import { useUser } from "@clerk/clerk-react";
import { clsx } from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppShell,
  Stack,
  Button,
  Flex,
  ActionIcon,
  Divider,
  Text,
  Anchor,
} from "@mantine/core";
import { FaGithub } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import { pageInfo } from "../../pages/pageInfo";
import { useTheme } from "../../hooks/useTheme";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  const { isSignedIn } = useUser();

  return (
    <>
      <AppShell.Section grow>
        <Stack align="stretch" justify="flex-start" gap="xs">
          {pageInfo.map((page, key) => {
            return (
              <Button
                variant="subtle"
                justify="flex-start"
                key={`page-btn-${key}`}
                leftSection={<page.icon className="text-lg" />}
                className={clsx(
                  location.pathname === page.route ||
                    (location.pathname.startsWith("/profile") &&
                      page.route === "/profile")
                    ? "bg-primary/10"
                    : "",
                  !isSignedIn && page.route === "/profile" ? "hidden" : "",
                )}
                h={60}
                onClick={() => navigate(page.route)}
              >
                {page.name}
              </Button>
            );
          })}
        </Stack>
      </AppShell.Section>
      <AppShell.Section>
        <Stack align="center" gap={0}>
          <Divider w="100%" />
          <Flex p="md" align="center" justify="center" wrap="wrap" gap="xs">
            <a href="https://github.com/teddyld/ggtw" target="_blank">
              <ActionIcon
                variant="default"
                size="xl"
                color="gray"
                aria-label="GitHub"
              >
                <FaGithub className="text-2xl" />
              </ActionIcon>
            </a>
            <ActionIcon
              variant="default"
              size="xl"
              color="gray"
              onClick={() => toggleTheme()}
              aria-label="Theme"
            >
              {theme === "dark" ? (
                <MdOutlineDarkMode className="text-2xl" />
              ) : (
                <MdOutlineLightMode className="text-2xl" />
              )}
            </ActionIcon>
          </Flex>

          <Text pb="sm" ta="center" c="dimmed">
            Made by 
            <Anchor href="https://teddyld.github.io/" target="_blank">
              Vincent Pham
            </Anchor>
          </Text>
        </Stack>
      </AppShell.Section>
    </>
  );
}

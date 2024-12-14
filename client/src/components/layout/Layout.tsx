import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppShell,
  Burger,
  Group,
  Stack,
  Button,
  Flex,
  ActionIcon,
  Divider,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  FaDumbbell,
  FaRegEdit,
  FaChartLine,
  FaRegUser,
  FaGithub,
} from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import Logo from "./Logo";

const pageInfo = [
  {
    name: "Workout",
    route: "/",
    icon: FaDumbbell,
  },
  {
    name: "Program",
    route: "/program",
    icon: FaRegEdit,
  },
  {
    name: "Statistics",
    route: "/statistics",
    icon: FaChartLine,
  },
  {
    name: "Profile",
    route: "/profile",
    icon: FaRegUser,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const { setColorScheme } = useMantineColorScheme();

  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <AppShell
      header={{ height: 55 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: {
          mobile: !opened,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Logo />
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Stack justify="space-between" h="100%">
          <Stack align="stretch" justify="flex-start" gap="xs">
            {pageInfo.map((page, key) => {
              return (
                <Button
                  variant="subtle"
                  justify="flex-start"
                  key={`page-btn-${key}`}
                  leftSection={<page.icon className="text-lg" />}
                  className={
                    location.pathname === page.route ||
                    (location.pathname.startsWith("/profile") &&
                      page.route === "/profile")
                      ? "bg-primary/10"
                      : ""
                  }
                  h={60}
                  onClick={() => navigate(page.route)}
                >
                  {page.name}
                </Button>
              );
            })}
          </Stack>
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
                onClick={() => toggleColorScheme()}
                aria-label="Theme"
              >
                {computedColorScheme === "dark" ? (
                  <MdOutlineDarkMode className="text-2xl" />
                ) : (
                  <MdOutlineLightMode className="text-2xl" />
                )}
              </ActionIcon>
            </Flex>
          </Stack>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

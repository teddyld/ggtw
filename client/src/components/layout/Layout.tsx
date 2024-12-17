import React from "react";
import { AppShell, Flex } from "@mantine/core";

import { useNavbar } from "../../hooks/useNavbar";
import Header from "./Header";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { opened, toggle } = useNavbar();
  const size = opened ? 250 : 60;

  return (
    <AppShell
      layout="alt"
      header={{ height: 55 }}
      navbar={{
        width: size,
        breakpoint: "sm",
        collapsed: {
          mobile: !opened,
        },
      }}
      padding="xs"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <NavBar opened={opened} toggle={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="nowrap"
        >
          {children}
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}

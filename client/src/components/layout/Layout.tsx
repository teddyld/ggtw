import React from "react";
import { AppShell, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Header from "./Header";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

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
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <NavBar />
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

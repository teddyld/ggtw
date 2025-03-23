import React from "react";
import { AppShell, Flex, Anchor, Text, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useNavbar } from "../../hooks/useNavbar";
import Header from "./Header";
import NavBar from "./NavBar";
import PrivacyModal from "./PrivacyModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { opened, toggle } = useNavbar();
  const [modalOpened, { open, close }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 55 }}
      navbar={{
        width: opened ? 250 : 60,
        breakpoint: "sm",
        collapsed: {
          mobile: !opened,
        },
      }}
      footer={{ height: 60 }}
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
      <AppShell.Footer>
        <Group p="md" justify="space-between" w="100%">
          <Text size="sm" c="dimmed">
            © {new Date().getFullYear()} ggtw. All rights reserved.
          </Text>
          <Group gap="xs">
            <Anchor size="sm" onClick={open}>
              Privacy Policy
            </Anchor>
            <Anchor href="mailto: ggtw.vincent@gmail.com" size="sm">
              Contact Us
            </Anchor>
          </Group>
        </Group>
        <PrivacyModal opened={modalOpened} close={close} />
      </AppShell.Footer>
    </AppShell>
  );
}

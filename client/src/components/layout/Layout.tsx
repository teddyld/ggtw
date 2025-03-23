import React from "react";
import { AppShell, Flex, Anchor, Text, Group, Divider } from "@mantine/core";
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
      padding="xs"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <NavBar opened={opened} toggle={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>
        <div className="min-h-screen">
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="nowrap"
          >
            {children}
          </Flex>
        </div>
        <footer className="mt-4 w-full">
          <Divider w="100%" />
          <Group p="md" pt="lg" justify="center" w="100%">
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
        </footer>
      </AppShell.Main>
    </AppShell>
  );
}

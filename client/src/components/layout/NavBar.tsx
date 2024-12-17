import {
  AppShell,
  ActionIcon,
  Divider,
  Group,
  Tooltip,
  Box,
} from "@mantine/core";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Logo from "./Logo";
import NavBarPages from "./NavBarPages";
import NavBarFooter from "./NavBarFooter";

export default function NavBar({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  return (
    <>
      <AppShell.Section p="md">
        <Group justify="space-between">
          <Logo opened={opened} />
          {opened && (
            <Tooltip label="Collapse Sidebar">
              <ActionIcon
                variant="default"
                color="gray"
                aria-label="Collapse sidebar"
                onClick={toggle}
              >
                <FaChevronLeft />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </AppShell.Section>
      <AppShell.Section grow>
        <NavBarPages opened={opened} />
      </AppShell.Section>
      {!opened && (
        <AppShell.Section>
          <Divider w="100%" />
          <Box p="md">
            <Tooltip label="Expand Sidebar">
              <ActionIcon
                variant="default"
                color="gray"
                aria-label="Expand sidebar"
                onClick={toggle}
              >
                <FaChevronRight />
              </ActionIcon>
            </Tooltip>
          </Box>
        </AppShell.Section>
      )}
      <AppShell.Section>
        <NavBarFooter opened={opened} />
      </AppShell.Section>
    </>
  );
}

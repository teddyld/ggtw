import { Stack, Group, Text, Tooltip } from "@mantine/core";

import { pageInfo } from "../../pages/pageInfo";
import NavBarButton from "./NavBarButton";

export default function NavBarPages({ opened }: { opened: boolean }) {
  return (
    <Stack align="stretch" justify="flex-start" gap="xs">
      {pageInfo.map((page, key) => {
        if (opened) {
          return (
            <NavBarButton page={page} key={`page-btn-${key}`}>
              <Group>
                <page.icon className="text-lg" />
                <Text size="md">{page.name}</Text>
              </Group>
            </NavBarButton>
          );
        } else {
          return (
            <Tooltip label={page.name} position="right">
              <NavBarButton page={page} key={`page-btn-${key}`}>
                <page.icon className="text-lg" />
              </NavBarButton>
            </Tooltip>
          );
        }
      })}
    </Stack>
  );
}

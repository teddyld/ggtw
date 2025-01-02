import {
  Stack,
  Flex,
  ActionIcon,
  Divider,
  Text,
  Anchor,
  Tooltip,
} from "@mantine/core";
import { FaGithub } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import { useTheme } from "../../hooks/useTheme";

export default function NavBarFooter({ opened }: { opened: boolean }) {
  const { theme, toggleTheme } = useTheme();

  const themeTooltip = theme === "dark" ? "Light" : "Dark";

  return (
    <Stack align="center" gap={0}>
      <Divider w="100%" />
      <Flex p="md" align="center" justify="center" wrap="wrap" gap="xs">
        <Tooltip label="GitHub" position="right">
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
        </Tooltip>
        <Tooltip label={`${themeTooltip} mode`} position="right">
          <ActionIcon
            variant="default"
            size="xl"
            color="gray"
            onClick={() => toggleTheme()}
            aria-label={`Change theme to ${theme}`}
          >
            {theme === "dark" ? (
              <MdOutlineDarkMode className="text-2xl" />
            ) : (
              <MdOutlineLightMode className="text-2xl" />
            )}
          </ActionIcon>
        </Tooltip>
      </Flex>

      <Text
        pb="sm"
        ta="center"
        c="dimmed"
        className={!opened ? "hidden" : ""}
        aria-hidden={!opened ? "true" : "false"}
      >
        Made by 
        <Anchor href="https://teddyld.github.io/" target="_blank">
          Vincent Pham
        </Anchor>
      </Text>
    </Stack>
  );
}

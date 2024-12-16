import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import {
  Burger,
  Group,
  Button,
  Menu,
  Switch,
  Avatar,
  Text,
  Box,
} from "@mantine/core";
import { MdLogin, MdLogout } from "react-icons/md";
import { FaRegUser, FaChevronDown } from "react-icons/fa";

import Logo from "./Logo";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";

export default function Header({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap">
        <Group wrap="nowrap" gap="md">
          <Logo />
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
        </Group>

        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/">
            <Button leftSection={<MdLogin className="text-2xl" />}>
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Menu>
            <Menu.Target>
              <Button
                h={{ base: 38, sm: 48 }}
                p={{ base: "0", sm: "10" }}
                variant="gradient"
                className="h-min"
                radius="xl"
                gradient={{ from: "red", to: "rgba(120, 0, 0, 1)", deg: 150 }}
              >
                <Group justify="space-between" wrap="nowrap" gap="xs">
                  <Avatar
                    src={user?.imageUrl}
                    alt="Profile avatar"
                    className="border-2 border-secondary hover:border-transparent"
                    size={35}
                  />
                  <Text visibleFrom="sm">You</Text>
                  <Box visibleFrom="sm">
                    <FaChevronDown />
                  </Box>
                </Group>
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<FaRegUser className="text-xl" />}
                onClick={() => navigate("/profile")}
              >
                Profile
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item closeMenuOnClick={false}>
                <Switch
                  label="Dark mode"
                  checked={theme === "dark"}
                  onChange={() => toggleTheme()}
                />
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red">
                <SignOutButton>
                  <Group gap="xs">
                    <MdLogout className="text-xl" />
                    Sign out
                  </Group>
                </SignOutButton>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </SignedIn>
      </Group>
    </>
  );
}

import { useNavigate } from "react-router-dom";
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
import { FaRegUser, FaChevronDown, FaPlus } from "react-icons/fa";

import { useTheme } from "../../hooks/useTheme";
import { useProgram } from "../../hooks/useProgram";

import WorkoutNewButton from "../workout/WorkoutNewButton";
import WorkoutTemplatesButton from "../workout/WorkoutTemplatesButton";
import Logo from "./Logo";

export default function Header({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const { isSignedIn, user } = useUser();
  const { program, setProgram } = useProgram();
  const navigate = useNavigate();

  return (
    <>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap">
        <Group wrap="nowrap" gap="md">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            aria-label="Toggle navigation"
            className={!isSignedIn ? "hidden" : ""}
          />
          <Box hiddenFrom="sm">
            <Logo opened={false} />
          </Box>
        </Group>

        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/workout">
            <Button leftSection={<MdLogin className="text-2xl" />}>
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Group wrap="nowrap">
            <Button.Group>
              <WorkoutNewButton
                program={program}
                setProgram={setProgram}
                leftSection={<FaPlus />}
                color="red"
                radius="lg"
                variant="outline"
              >
                Create
              </WorkoutNewButton>
              <WorkoutTemplatesButton
                program={program}
                setProgram={setProgram}
                variant="outline"
                color="red"
                radius="lg"
              />
            </Button.Group>
            <Menu>
              <Menu.Target>
                <Button
                  h={{ base: 30, sm: 40 }}
                  p={{ base: "0", sm: "10" }}
                  py="0"
                  variant="gradient"
                  className="h-min"
                  radius="xl"
                  gradient={{ from: "red.9", to: "red.4", deg: 150 }}
                >
                  <Group justify="space-between" wrap="nowrap" gap="xs">
                    <Avatar
                      src={user?.imageUrl}
                      alt="Profile avatar"
                      className="border-2 border-secondary hover:border-transparent"
                      size={30}
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
          </Group>
        </SignedIn>
      </Group>
    </>
  );
}

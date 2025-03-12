import {
  Button,
  Divider,
  Drawer,
  Stack,
  Text,
  Group,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoFilter } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";

import { useTheme } from "../../hooks/useTheme";

export default function FilterDrawer({
  filter,
  muscleGroups,
  changeFilter,
  clearFilter,
}: {
  filter: string[];
  muscleGroups: string[];
  changeFilter: (filter: string[]) => void;
  clearFilter: () => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const { theme } = useTheme();

  const handleFilters = (muscle: string) => {
    if (filter.includes(muscle)) {
      const newFilter = Array.from(filter);
      const index = newFilter.indexOf(muscle);
      newFilter.splice(index, 1);
      changeFilter(newFilter);
    } else {
      changeFilter([...filter, muscle]);
    }
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Filters"
        position="bottom"
        classNames={{ title: "text-xl font-bold py-2" }}
      >
        <Stack justify="space-between">
          <Stack gap="xs">
            <Divider className="mb-4" />
            <div>
              <Text>Muscle groups</Text>
              <Text c="dimmed">Select muscle groups to filter exercises</Text>
            </div>
            <Paper
              p="md"
              className={theme === "light" ? "bg-stone-200" : "bg-zinc-900"}
            >
              {muscleGroups.length === 0 && (
                <Text>
                  There are no muscle groups to filter! Add muscle groups to
                  your exercises to help track your goals the next time you log
                  a set.
                </Text>
              )}
              <Group>
                {muscleGroups.map((muscle, i) => {
                  return (
                    <Button
                      key={i}
                      color={!filter.includes(muscle) ? "gray" : "red"}
                      onClick={() => handleFilters(muscle)}
                    >
                      {muscle}
                    </Button>
                  );
                })}
              </Group>
            </Paper>
          </Stack>
          <Group wrap="nowrap" justify="space-between">
            <Button
              color="gray"
              variant="outline"
              leftSection={<RiResetLeftFill className="size-5" />}
              onClick={() => clearFilter()}
            >
              Reset filters
            </Button>
            <span />
          </Group>
        </Stack>
      </Drawer>
      <Stack gap={2}>
        <Text fw={500} size="sm">
          Show
        </Text>
        <Button
          color="gray"
          variant="light"
          leftSection={<IoFilter />}
          onClick={open}
        >
          Filters
        </Button>
      </Stack>
    </>
  );
}

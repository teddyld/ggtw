import { Group, Menu, ActionIcon, Checkbox, Text } from "@mantine/core";
import { FaPen } from "react-icons/fa";
import { MdFastForward } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";

import { exerciseTypes } from "./workoutData";

export default function ExerciseMenu({
  exerciseName,
  checked,
  open,
  updateExerciseTypes,
  logAllSets,
}: {
  exerciseName: string;
  checked: exerciseTypes;
  open: () => void;
  updateExerciseTypes: (types: exerciseTypes) => void;
  logAllSets: () => void;
}) {
  const checkReps = () => {
    updateExerciseTypes({ ...checked, reps: !checked.reps });
  };

  const checkTime = () => {
    updateExerciseTypes({ ...checked, time: !checked.time });
  };

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="outline" aria-label={`Edit ${exerciseName}`}>
          <FaPen />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Exercise</Menu.Label>
        <Menu.Item
          leftSection={<CgDetailsMore className="text-xl" />}
          onClick={open}
          aria-label="Edit exercise details"
        >
          Edit details
        </Menu.Item>
        <Menu.Item
          leftSection={<MdFastForward className="text-xl" />}
          onClick={logAllSets}
          aria-label="Log all sets"
        >
          Log all sets
        </Menu.Item>
        <Menu.Label>Set type</Menu.Label>
        <Menu.Item closeMenuOnClick={false} p={0} component="div">
          <Checkbox.Card
            className="p-2"
            checked={checked.reps}
            onChange={() => checkReps()}
            withBorder={false}
            aria-label="Reps checkbox"
          >
            <Group gap="xs" wrap="nowrap">
              <Checkbox.Indicator />
              <Text size="sm">Reps</Text>
            </Group>
          </Checkbox.Card>
        </Menu.Item>
        <Menu.Item closeMenuOnClick={false} p={0} component="div">
          <Checkbox.Card
            className="p-2"
            checked={checked.time}
            onChange={() => checkTime()}
            withBorder={false}
            aria-label="Time checkbox"
          >
            <Group gap="xs" wrap="nowrap">
              <Checkbox.Indicator />
              <Text size="sm">Time</Text>
            </Group>
          </Checkbox.Card>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

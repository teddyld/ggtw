import { Menu, Button, Group } from "@mantine/core";
import { FaChevronDown } from "react-icons/fa";

import { workoutType, WorkoutButtonType, getTemplate } from "./workoutData";

export default function WorkoutTemplatesButton({
  setWorkout,
  children,
  ...rest
}: WorkoutButtonType) {
  // Add template workout defined in workoutData to program
  const addTemplateWorkout = async (template: workoutType) => {
    setWorkout(template, "Workout created successfully!");
  };

  return (
    <Menu>
      <Menu.Target>
        <Button aria-label="Template workouts" {...rest}>
          <Group gap="xs" wrap="nowrap">
            {children}
            <FaChevronDown />
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Templates</Menu.Label>
        <Menu.Item
          onClick={() => addTemplateWorkout(getTemplate("Back + Biceps"))}
        >
          Back + Biceps
        </Menu.Item>
        <Menu.Item
          onClick={() => addTemplateWorkout(getTemplate("Chest + Triceps"))}
        >
          Chest + Triceps
        </Menu.Item>
        <Menu.Item onClick={() => addTemplateWorkout(getTemplate("Legs"))}>
          Legs
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

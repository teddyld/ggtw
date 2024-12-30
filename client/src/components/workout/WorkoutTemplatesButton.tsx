import { Menu, Button, Group } from "@mantine/core";
import { FaChevronDown } from "react-icons/fa";
import { WorkoutButtonType } from "./workoutData";

import { workoutState, templateWorkouts as templates } from "./workoutData";

export default function WorkoutTemplatesButton({
  program,
  setProgram,
  children,
  ...rest
}: WorkoutButtonType) {
  // Add template workout defined in workoutData to program
  const addTemplateWorkout = async (template: workoutState) => {
    const newProgram = [...program, template];
    setProgram(newProgram);
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
          onClick={() => addTemplateWorkout(templates["Back + Biceps"])}
        >
          Back + Biceps
        </Menu.Item>
        <Menu.Item
          onClick={() => addTemplateWorkout(templates["Chest + Triceps"])}
        >
          Chest + Triceps
        </Menu.Item>
        <Menu.Item onClick={() => addTemplateWorkout(templates["Legs"])}>
          Legs
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

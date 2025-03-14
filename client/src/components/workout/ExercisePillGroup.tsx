import { Group } from "@mantine/core";

import ExercisePill from "./ExercisePill";

export default function ExercisePillGroup({
  muscleGroups,
}: {
  muscleGroups: string[];
}) {
  return (
    <Group w="100%" gap="xs" wrap="nowrap">
      {muscleGroups.map((muscle, i) => (
        <ExercisePill key={`muscleGroup-${i}`}>
          {muscle.toUpperCase()}
        </ExercisePill>
      ))}
    </Group>
  );
}

import {
  Title,
  Group,
  Stack,
  Text,
  Badge,
  NumberInput,
  Divider,
} from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";

import Container from "../layout/Container";
import { programState, workoutState } from "./workoutData";

export default function Workout({
  workout,
  program,
  setProgram,
}: {
  workout: workoutState;
  program: programState;
  setProgram: (program: programState) => Promise<void>;
}) {
  const exercises = workout.exerciseOrder.map(
    (exerciseId) => workout.exercises[exerciseId],
  );

  const setValue = (setId: string, exerciseId: string, value: number) => {
    console.log(value);
    console.log(workout);
  };

  return (
    <Container>
      <Title order={2} size="xl">
        {workout.name}
      </Title>
      {exercises.map((exercise, i) => {
        const sets = Object.values(exercise.sets);
        return (
          <div key={`exercise-${i}`}>
            <Stack gap="xs" my="lg">
              <Group gap="xs">
                {exercise.muscleGroups.map((muscleGroup, i) => (
                  <Badge key={`muscleGroup-${i}`} radius="xs" variant="light">
                    {muscleGroup}
                  </Badge>
                ))}
              </Group>
              <Title order={3} size="md">
                {exercise.name}
              </Title>
              <Stack gap="xs">
                <Group wrap="nowrap">
                  <span className="min-w-4" />
                  <Text>WEIGHTS</Text>
                  <Text>{exercise.type.toUpperCase()}</Text>
                </Group>
                {sets.map((set, i) => (
                  <Group key={`set-${i}`} gap="xs" wrap="nowrap">
                    <BsThreeDotsVertical className="min-w-4" />
                    <NumberInput
                      classNames={{
                        input: "text-center",
                      }}
                      aria-label={`Set-${i} weight input of exercise ${exercise.name}`}
                      allowNegative={false}
                      allowLeadingZeros={false}
                      value={set.values.weight}
                      hideControls
                      w={100}
                    />
                    <NumberInput
                      classNames={{
                        input: "text-center",
                      }}
                      aria-label={`Set-${i} ${exercise.type} input of exercise ${exercise.name}`}
                      allowNegative={false}
                      allowLeadingZeros={false}
                      value={set.values.reps}
                      onChange={(value) =>
                        setValue(set.id, exercise.id, Number(value))
                      }
                      hideControls
                      w={100}
                    />
                  </Group>
                ))}
              </Stack>
            </Stack>
            <Divider />
          </div>
        );
      })}
    </Container>
  );
}

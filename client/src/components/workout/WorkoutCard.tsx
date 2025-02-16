import { useNavigate } from "react-router-dom";
import { Card, Title, Text, Group } from "@mantine/core";

import { workoutType } from "./workoutData";

export default function WorkoutCards({ workout }: { workout: workoutType }) {
  const navigate = useNavigate();

  const openWorkout = (workoutName: string, workoutId: string) => {
    const encodedName = workoutName.replace(/ /g, "_");
    navigate(`/workout/${encodedName}/${workoutId}`);
  };

  const exercises = Object.values(workout.exercises);
  return (
    <Card
      withBorder
      radius="md"
      className="group cursor-pointer hover:border-red-500"
      onClick={() => openWorkout(workout.name, workout.id)}
      shadow="sm"
    >
      <Card.Section
        withBorder
        inheritPadding
        py="sm"
        className="group-hover:border-red-500"
      >
        <Group justify="space-between" gap={0} align="center">
          <Title order={2} fw={500} size="xl">
            {workout.name}
          </Title>
          <Text c="dimmed">
            Set last logged:{" "}
            {workout.lastAccessed ? workout.lastAccessed : "N/A"}
          </Text>
        </Group>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        <Title order={3} c="dimmed" size="lg">
          Exercises
        </Title>
        {exercises.length > 0 ? (
          exercises.map((exercise) => {
            return <Text key={exercise.id}>{exercise.name}</Text>;
          })
        ) : (
          <Text>No exercises found</Text>
        )}
      </Card.Section>
    </Card>
  );
}

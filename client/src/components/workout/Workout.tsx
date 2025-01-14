import React from "react";
import { Title, Divider, Flex, Group, ActionIcon, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaPen, FaPlus } from "react-icons/fa";

import Container from "../layout/Container";
import ExerciseList from "./ExerciseList";
import WorkoutModal from "./WorkoutModal";
import { exerciseType, workoutType } from "./workoutData";

export default function Workout({
  workout,
  index,
  exercises,
  setWorkout,
  deleteWorkout,
}: {
  workout: workoutType;
  index: number;
  exercises: exerciseType[];
  setWorkout: (workout: workoutType, message: string) => Promise<void>;
  deleteWorkout: (workoutId: string) => void;
}) {
  const [opened, { open, close }] = useDisclosure();
  const [workoutName, setWorkoutName] = React.useState(workout.name);

  // Create exercise
  const createExercise = () => {
    const newExerciseId = `exercise-${workout.exerciseCount + 1}`;
    const newExercises = {
      ...workout.exercises,
      [newExerciseId]: {
        id: newExerciseId,
        name: "New Exercise",
        muscleGroups: [],
        types: { reps: true, time: false },
        setOrder: ["set-1", "set-2", "set-3"],
        setCount: 3,
        sets: {
          "set-1": {
            id: "set-1",
            values: {
              reps: 0,
              weight: 0,
              time: 0,
            },
          },
          "set-2": {
            id: "set-2",
            values: {
              reps: 0,
              weight: 0,
              time: 0,
            },
          },
          "set-3": {
            id: "set-3",
            values: {
              reps: 0,
              weight: 0,
              time: 0,
            },
          },
        },
      },
    };

    const newWorkout = {
      ...workout,
      exercises: newExercises,
      exerciseCount: workout.exerciseCount + 1,
      exerciseOrder: [...workout.exerciseOrder, newExerciseId],
    };

    setWorkout(newWorkout, "");
  };

  // Remove exercise
  const removeWorkout = () => {
    close();
    deleteWorkout(workout.id);
  };

  // Rename workout
  const renameWorkout = (newName: string) => {
    if (workoutName === newName) {
      close();
      return;
    }

    const newWorkout = {
      ...workout,
      name: newName,
    };

    setWorkout(newWorkout, "Workout updated successfully.").then(() => {
      setWorkoutName(newName);
      close();
    });
  };

  return (
    <Container>
      <Group
        wrap="nowrap"
        align="center"
        py="xs"
        justify="space-between"
        gap="xs"
      >
        <span />
        <Title order={2} size="xl" className="flex justify-center">
          {workoutName}
        </Title>
        <ActionIcon
          color="gray"
          variant="subtle"
          aria-label="Edit workout"
          onClick={open}
        >
          <FaPen />
        </ActionIcon>
        <WorkoutModal
          name={workoutName}
          removeWorkout={removeWorkout}
          renameWorkout={renameWorkout}
          opened={opened}
          close={close}
        />
      </Group>
      <Divider mb="lg" />
      <Flex
        justify="center"
        align="center"
        direction="column"
        gap="xs"
        wrap="wrap"
      >
        {exercises.map((exercise) => {
          return (
            <ExerciseList
              key={`${workout.id}-${exercise.id}`}
              exercise={exercise}
              index={index}
            />
          );
        })}
        <Button
          w="100%"
          color="gray"
          variant="outline"
          leftSection={<FaPlus />}
          onClick={() => createExercise()}
        >
          New Exercise
        </Button>
      </Flex>
    </Container>
  );
}

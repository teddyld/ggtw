import { Title, Divider, Flex, Group, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaPen } from "react-icons/fa";
import { LayoutGroup } from "framer-motion";

import Container from "../layout/Container";
import ExerciseList from "./ExerciseList";
import ExerciseNewModal from "./ExerciseNewModal";
import WorkoutModal from "./WorkoutModal";
import { exerciseType, workoutType } from "./workoutData";

export default function Workout({
  workout,
  exercises,
  setWorkout,
  deleteWorkout,
}: {
  workout: workoutType;
  exercises: exerciseType[];
  setWorkout: (workout: workoutType, message: string) => Promise<void>;
  deleteWorkout: (workoutId: string) => void;
}) {
  const [opened, { open, close }] = useDisclosure();

  // Create exercise
  const createExercise = async (exerciseName: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const newExerciseId = `exercise-${workout.exerciseCount + 1}`;
        const newExercises = {
          ...workout.exercises,
          [newExerciseId]: {
            id: newExerciseId,
            name: exerciseName,
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
        resolve();
      } catch (_) {
        reject();
      }
    });
  };

  // Remove exercise
  const removeWorkout = () => {
    close();
    deleteWorkout(workout.id);
  };

  // Rename workout
  const renameWorkout = (newName: string) => {
    if (workout.name === newName) {
      close();
      return;
    }

    const newWorkout = {
      ...workout,
      name: newName,
    };

    setWorkout(newWorkout, "Workout updated successfully.").then(() => {
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
          {workout.name}
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
          name={workout.name}
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
        <LayoutGroup>
          {exercises.map((exercise) => {
            return (
              <ExerciseList
                key={`${workout.id}-${exercise.id}`}
                workout={workout}
                setWorkout={setWorkout}
                exercise={exercise}
              />
            );
          })}
        </LayoutGroup>
        <ExerciseNewModal createExercise={createExercise} />
      </Flex>
    </Container>
  );
}

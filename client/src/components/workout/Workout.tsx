import { Title, Divider, Flex, Group, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { LayoutGroup } from "framer-motion";

import Layout from "../layout/Layout";
import Container from "../layout/Container";
import WorkoutModal from "./WorkoutModal";
import WorkoutLoading from "./WorkoutLoading";
import Exercise from "./Exercise";
import ExerciseNewModal from "./ExerciseNewModal";

import { useWorkout } from "../../hooks/useWorkout";
import NotFoundPage from "../../pages/NotFoundPage";

export default function Workout() {
  const [opened, { open, close }] = useDisclosure();
  const params = useParams();

  const { userWorkouts, workoutPending, setWorkout, deleteWorkout } =
    useWorkout();

  if (workoutPending) {
    return <WorkoutLoading />;
  }

  const workoutIndex = userWorkouts.findIndex(
    (workout) => workout.id === params.id,
  );
  const workout = userWorkouts[workoutIndex];

  if (userWorkouts.length > 0 && workoutIndex === -1) {
    return <NotFoundPage />;
  } else if (!workout) {
    return <WorkoutLoading />;
  }

  const exercises = Object.values(workout.exercises);

  // Create exercise
  const createExercise = (exerciseName: string) => {
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
            units: "kg" as const,
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
    <Layout>
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
                <Exercise
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
    </Layout>
  );
}

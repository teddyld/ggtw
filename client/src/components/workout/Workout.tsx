import React from "react";
import { Title, Divider, Flex, Group, ActionIcon, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaPen, FaPlus } from "react-icons/fa";

import Container from "../layout/Container";
import ExerciseList from "./ExerciseList";
import WorkoutModal from "./WorkoutModal";
import { programState, workoutState } from "./workoutData";

import { useWorkout } from "../../hooks/useWorkout";

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

  const {
    updateSetValue,
    deleteSet,
    addBelowSet,
    createSet,
    updateSetType,
    updateExerciseDetails,
    deleteExercise,
    createExercise,
    deleteWorkout,
    renameWorkout,
  } = useWorkout(workout, program, setProgram);

  const [opened, { open, close }] = useDisclosure();
  const [workoutName, setWorkoutName] = React.useState(workout.name);

  // Wrapper for delete workout
  const handleDeleteWorkout = () => {
    close();
    deleteWorkout();
  };

  // Wrapper for renaming workout
  const handleRenameWorkout = (newName: string) => {
    close();
    setWorkoutName(newName);
    renameWorkout(newName);
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
          deleteWorkout={handleDeleteWorkout}
          renameWorkout={handleRenameWorkout}
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
              key={exercise.id}
              exercise={exercise}
              updateSetValue={updateSetValue}
              deleteSet={deleteSet}
              addBelowSet={addBelowSet}
              updateSetType={updateSetType}
              updateExerciseDetails={updateExerciseDetails}
              createSet={createSet}
              deleteExercise={deleteExercise}
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

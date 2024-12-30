import React from "react";
import {
  Title,
  Group,
  Stack,
  Divider,
  ScrollArea,
  Text,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaPlus } from "react-icons/fa";

import {
  exerciseType,
  setInputTypes,
  setType,
  exerciseTypes,
} from "./workoutData";
import ExerciseMenu from "./ExerciseMenu";
import ExerciseModal from "./ExerciseModal";
import ExercisePill from "./ExercisePill";
import SetList from "./SetList";

import { useExercise } from "../../hooks/useExercise";

export default function Exercise({
  exercise,
  updateSetValue,
  deleteSet,
  addBelowSet,
  updateSetType,
  updateExerciseDetails,
  createSet,
  deleteExercise,
}: {
  exercise: exerciseType;
  updateSetValue: (
    exerciseId: string,
    setId: string,
    newValue: number,
    type: setInputTypes,
  ) => void;
  deleteSet: (
    exerciseId: string,
    setId: string,
    setSets: (value: React.SetStateAction<setType[]>) => void,
  ) => void;
  addBelowSet: (
    exerciseId: string,
    setId: string,
    setSets: (value: React.SetStateAction<setType[]>) => void,
  ) => void;
  updateSetType: (exerciseId: string, types: exerciseTypes) => void;
  updateExerciseDetails: (
    exerciseId: string,
    newNme: string,
    newMuscleGroups: string[],
  ) => void;
  createSet: (
    exerciseId: string,
    setSets: (value: React.SetStateAction<setType[]>) => void,
  ) => void;
  deleteExercise: (exerciseId: string) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const {
    exerciseId,
    sets,
    setSets,
    checked,
    setChecked,
    exerciseName,
    setExerciseName,
    muscleGroups,
    setMuscleGroups,
  } = useExercise(exercise);

  // Wrapper for updating set value
  const handleUpdateSetValue = (
    setId: string,
    newValue: number,
    type: setInputTypes,
  ) => {
    updateSetValue(exerciseId, setId, newValue, type);
  };

  // Wrapper for addBelowSet and deleteSet operations
  const handleUpdateSets = (setId: string, action: "add" | "delete") => {
    // Add set below setId in sets
    if (action === "add") {
      addBelowSet(exerciseId, setId, setSets);
    } else {
      // Remove setId from sets
      deleteSet(exerciseId, setId, setSets);
    }
  };

  // Wrapper for updating set types
  const handleUpdateSetTypes = (types: exerciseTypes) => {
    setChecked(types);
    updateSetType(exerciseId, types);
  };

  // Wrapper for updating the exercise name and muscle groups
  const handleUpdateExercise = (newName: string, newMuscleGroups: string[]) => {
    close();
    setExerciseName(newName);
    setMuscleGroups(newMuscleGroups);
    if (newName !== exerciseName || newMuscleGroups !== muscleGroups) {
      updateExerciseDetails(exerciseId, newName, newMuscleGroups);
    }
  };

  // Wrapper for delete exercise
  const handleDeleteExercise = () => {
    close();
    deleteExercise(exerciseId);
  };

  return (
    <>
      <Stack gap="xs" w="100%">
        <Stack justify="space-between">
          <Group justify="space-between" wrap="nowrap">
            <Title order={3} size="md">
              {exerciseName}
            </Title>
            <ExerciseMenu
              exerciseName={exerciseName}
              checked={checked}
              open={open}
              updateSetTypes={handleUpdateSetTypes}
            />
          </Group>
          <ScrollArea
            offsetScrollbars
            type="hover"
            scrollHideDelay={0}
            className={muscleGroups.length === 0 ? "hidden" : ""}
            w="100%"
          >
            <Group w="100%" gap="xs" wrap="nowrap">
              {muscleGroups.map((muscleGroup, i) => (
                <ExercisePill key={`muscleGroup-${i}`}>
                  {muscleGroup.toUpperCase()}
                </ExercisePill>
              ))}
            </Group>
          </ScrollArea>
        </Stack>
        <Divider />
        {sets.length !== 0 ? (
          <Group wrap="nowrap" className="text-center">
            <span className="min-w-[26px]" />
            <Text fw={700} c="dimmed" className="w-full min-w-16">
              WEIGHT
            </Text>
            {checked.reps && (
              <Text fw={700} c="dimmed" className="w-full min-w-16">
                REPS
              </Text>
            )}
            {checked.time && (
              <Text fw={700} c="dimmed" className="w-full min-w-16">
                TIME (s)
              </Text>
            )}
          </Group>
        ) : (
          <Button
            w="100%"
            color="gray"
            className="min-w-fit self-center"
            variant="light"
            leftSection={<FaPlus />}
            onClick={() => createSet(exerciseId, setSets)}
          >
            New set
          </Button>
        )}
        {sets.map((set, i) => (
          <SetList
            key={`set-${i}`}
            set={set}
            checked={checked}
            updateSetValue={handleUpdateSetValue}
            updateSets={handleUpdateSets}
          />
        ))}
        <Divider />
      </Stack>
      <ExerciseModal
        exerciseName={exerciseName}
        muscleGroups={muscleGroups}
        updateExercise={handleUpdateExercise}
        deleteExercise={handleDeleteExercise}
        opened={opened}
        close={close}
      />
    </>
  );
}

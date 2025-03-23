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

import { exerciseType, setInputTypes, workoutType } from "./workoutData";
import ExerciseMenu from "./ExerciseMenu";
import ExerciseModal from "./ExerciseModal";
import ExercisePillGroup from "./ExercisePillGroup";
import SetList from "./SetList";

import { useExercise } from "../../hooks/useExercise";
import { useSet } from "../../hooks/useSet";
import ChangeUnits from "./ChangeUnits";

export default function Exercise({
  workout,
  setWorkout,
  exercise,
}: {
  workout: workoutType;
  setWorkout: (workout: workoutType, message: string) => Promise<void>;
  exercise: exerciseType;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [edit, setEdit] = React.useState(false);
  const [canceled, setCanceled] = React.useState(false);

  const sets = exercise.setOrder.map((setId) => exercise.sets[setId]);

  const {
    logged,
    updateExerciseTypes,
    updateExercise,
    deleteExercise,
    createSet,
    logAllSets,
    logSet,
    changeExerciseUnits,
  } = useExercise(exercise, workout, setWorkout);

  const { deleteSet, addSetBelow, updateSetValues } = useSet(
    exercise,
    workout,
    setWorkout,
  );

  const [modifySets, setModifySets] = React.useState(sets);

  const changeSetValue = (
    setId: string,
    value: number,
    type: setInputTypes,
  ) => {
    const newSets = structuredClone(modifySets);
    const index = newSets.findIndex((set) => set.id === setId);
    newSets[index].values[type] = value;
    setModifySets(newSets);
  };

  React.useEffect(() => {
    setCanceled(false);
  }, []);

  return (
    <>
      <Stack gap="xs" w="100%">
        <Stack justify="space-between">
          <Group justify="space-between" wrap="nowrap">
            <Title order={3} size="md">
              {exercise.name}
            </Title>
            <ExerciseMenu
              exerciseName={exercise.name}
              checked={exercise.types}
              open={open}
              updateExerciseTypes={updateExerciseTypes}
              logAllSets={logAllSets}
            />
          </Group>
          <Group justify="space-between">
            {exercise.muscleGroups.length !== 0 ? (
              <ScrollArea offsetScrollbars type="hover" scrollHideDelay={0}>
                <ExercisePillGroup muscleGroups={exercise.muscleGroups} />
              </ScrollArea>
            ) : (
              <span />
            )}

            <ChangeUnits
              initialUnits={exercise.units}
              changeUnits={changeExerciseUnits}
            />
          </Group>
        </Stack>
        <Divider />
        {sets.length !== 0 ? (
          <Group wrap="nowrap" className="text-center">
            <span className="min-w-[26px]" />
            <Text fw={700} c="dimmed" className="w-full min-w-16">
              WEIGHT
            </Text>
            {exercise.types.reps && (
              <Text fw={700} c="dimmed" className="w-full min-w-16">
                REPS
              </Text>
            )}
            {exercise.types.time && (
              <Text fw={700} c="dimmed" className="w-full min-w-16">
                TIME (s)
              </Text>
            )}
            <Text fw={700} c="dimmed" className="min-w-14">
              LOG
            </Text>
          </Group>
        ) : (
          <Button
            w="100%"
            color="gray"
            className="min-w-fit self-center"
            variant="light"
            leftSection={<FaPlus />}
            onClick={createSet}
          >
            New set
          </Button>
        )}
        <SetList
          sets={sets}
          changeSetValue={changeSetValue}
          checked={exercise.types}
          logged={logged}
          deleteSet={deleteSet}
          addSetBelow={addSetBelow}
          logSet={logSet}
          edit={edit}
          canceled={canceled}
          setEdit={setEdit}
        />
        {edit && (
          <Group justify="center">
            <Button
              color="gray"
              onClick={() => {
                setEdit(false);
                setCanceled(true);
                setModifySets([...sets]);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setEdit(false);
                updateSetValues(modifySets);
              }}
            >
              Save
            </Button>
          </Group>
        )}
        <Divider />
      </Stack>
      <ExerciseModal
        exerciseName={exercise.name}
        muscleGroups={exercise.muscleGroups}
        updateExercise={updateExercise}
        deleteExercise={deleteExercise}
        opened={opened}
        close={close}
      />
    </>
  );
}

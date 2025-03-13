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

import { exerciseType, workoutType } from "./workoutData";
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

  const sets = exercise.setOrder.map((setId) => exercise.sets[setId]);

  const {
    logged,
    updateExerciseTypes,
    updateExercise,
    deleteExercise,
    createSet,
    logAllSets,
    logSet,
    changeUnits,
  } = useExercise(exercise, workout, setWorkout);

  const { deleteSet, addSetBelow, updateSetValue } = useSet(
    exercise,
    workout,
    setWorkout,
  );

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
            <ScrollArea
              offsetScrollbars
              type="hover"
              scrollHideDelay={0}
              className={exercise.muscleGroups.length === 0 ? "hidden" : ""}
            >
              <ExercisePillGroup muscleGroups={exercise.muscleGroups} />
            </ScrollArea>
            <ChangeUnits
              initialUnits={exercise.units}
              changeUnits={changeUnits}
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
          checked={exercise.types}
          logged={logged}
          deleteSet={deleteSet}
          addSetBelow={addSetBelow}
          updateSetValue={updateSetValue}
          logSet={logSet}
        />
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

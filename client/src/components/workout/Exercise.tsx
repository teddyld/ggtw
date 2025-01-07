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
import ExercisePill from "./ExercisePill";
import Set from "./Set";

import { useAppSelector, useAppDispatch } from "../../store";
import { setWorkout } from "../../store/userReducer";
import { useExercise } from "../../hooks/useExercise";
import { useSet } from "../../hooks/useSet";

export default function Exercise({
  exercise,
  index,
}: {
  exercise: exerciseType;
  index: number;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  const userWorkouts = useAppSelector((state) => state.user.userWorkouts);
  const id = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();

  const handleSetWorkout = (workout: workoutType) => {
    dispatch(setWorkout({ userId: id, workout }));
  };

  const workout = userWorkouts[index];
  const sets = Object.values(exercise.sets);

  const {
    checked,
    exerciseName,
    muscleGroups,
    updateExerciseTypes,
    updateExercise,
    deleteExercise,
    createSet,
  } = useExercise(exercise, workout, handleSetWorkout);

  const { deleteSet, addSetBelow, updateSetValue } = useSet(
    exercise,
    workout,
    handleSetWorkout,
  );

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
              updateExerciseTypes={updateExerciseTypes}
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
            onClick={createSet}
          >
            New set
          </Button>
        )}
        {sets.map((set) => {
          return (
            <Set
              key={set.id}
              set={set}
              checked={checked}
              deleteSet={() => deleteSet(set.id)}
              addSetBelow={() => addSetBelow(set.id)}
              updateSetValue={updateSetValue}
            />
          );
        })}
        <Divider />
      </Stack>
      <ExerciseModal
        exerciseName={exerciseName}
        muscleGroups={muscleGroups}
        updateExercise={updateExercise}
        deleteExercise={deleteExercise}
        opened={opened}
        close={close}
      />
    </>
  );
}

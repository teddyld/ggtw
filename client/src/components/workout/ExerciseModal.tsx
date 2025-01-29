import React from "react";
import {
  Modal,
  Text,
  TextInput,
  Divider,
  Stack,
  Group,
  Button,
  PillsInput,
  Pill,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { FaInfoCircle } from "react-icons/fa";

import ExercisePill from "./ExercisePill";
import DeleteButton from "../layout/DeleteButton";
import { useDisclosure } from "@mantine/hooks";

export default function ExerciseModal({
  exerciseName,
  muscleGroups,
  updateExercise,
  deleteExercise,
  opened,
  close,
}: {
  exerciseName: string;
  muscleGroups: string[];
  updateExercise: (
    newName: string,
    newMuscleGroups: string[],
    close: () => void,
  ) => void;
  deleteExercise: () => void;
  opened: boolean;
  close: () => void;
}) {
  const [editName, setEditName] = React.useState("");
  const [editMuscleGroups, setEditMuscleGroups] = React.useState<string[]>([]);
  const [newMuscle, setNewMuscle] = React.useState("");
  const [muscleError, setMuscleError] = React.useState("");

  const [loading, { toggle }] = useDisclosure();

  React.useEffect(() => {
    setEditName(exerciseName);
    setEditMuscleGroups(muscleGroups);

    return () => {
      setNewMuscle("");
      // Reset loading prop
      if (loading) {
        toggle();
      }
    };
  }, [opened]);

  // Remove muscle from muscle group
  const handleOnRemove = (muscle: string) => {
    const newMuscleGroups = Array.from(editMuscleGroups);
    const muscleIndex = newMuscleGroups.indexOf(muscle);
    newMuscleGroups.splice(muscleIndex, 1);
    setEditMuscleGroups(newMuscleGroups);
  };

  // Add new muscle group to exercise when 'Enter' key is pressed
  const handleOnAdd = (key: string) => {
    setMuscleError("");
    if (!newMuscle || key !== "Enter") return;
    if (editMuscleGroups.includes(newMuscle.toUpperCase())) {
      setMuscleError("Muscle already exists in group");
      return;
    }
    const newMuscleGroups = Array.from(editMuscleGroups);
    newMuscleGroups.push(newMuscle.toUpperCase());
    setEditMuscleGroups([...newMuscleGroups]);
    setNewMuscle("");
  };

  // Submit when 'Enter' key is pressed with focus on TextInput
  const handleEnterKey = (key: string) => {
    if (!editName || key !== "Enter") return;
    handleSubmit();
  };

  const handleSubmit = () => {
    if (editName !== exerciseName || editMuscleGroups !== muscleGroups) {
      toggle();
      updateExercise(editName, editMuscleGroups, close);
    } else {
      close();
    }
  };

  return (
    <Modal
      title={
        <Text fw={700} size="xl">
          Exercise
        </Text>
      }
      opened={opened}
      onClose={close}
      centered
      size="md"
      withCloseButton={false}
    >
      <Stack gap="md">
        <TextInput
          label="Exercise name"
          value={editName}
          onChange={(event) => setEditName(event.currentTarget.value)}
          classNames={{
            label: "pb-2",
          }}
          error={editName === "" ? "Invalid name" : ""}
          onKeyDown={(event) => handleEnterKey(event.key)}
          disabled={loading}
        />
        <Group className="relative">
          <Tooltip
            label="Muscle groups are used to help track your statistics."
            className="absolute left-24 top-0"
          >
            <ActionIcon
              color="gray"
              variant="transparent"
              aria-label="Muscle group information"
            >
              <FaInfoCircle />
            </ActionIcon>
          </Tooltip>
          <PillsInput
            aria-label="Muscle groups input"
            label="Muscle groups"
            classNames={{
              label: "pb-2 relative",
            }}
            error={muscleError}
            w="100%"
          >
            <Pill.Group>
              {editMuscleGroups.map((muscle, i) => (
                <ExercisePill
                  key={`editMuscleGroup-${i}`}
                  withRemoveButton
                  onRemove={() => handleOnRemove(muscle)}
                >
                  {muscle.toUpperCase()}
                </ExercisePill>
              ))}
              <PillsInput.Field
                placeholder="Enter muscle"
                value={newMuscle}
                onChange={(event) => setNewMuscle(event.currentTarget.value)}
                onKeyDown={(event) => handleOnAdd(event.key)}
                disabled={loading}
              />
            </Pill.Group>
          </PillsInput>
        </Group>
        <Button
          color="gray"
          variant="light"
          onClick={() => handleOnAdd("Enter")}
        >
          Add
        </Button>
        <DeleteButton
          item="exercise"
          handleDelete={deleteExercise}
          disabled={loading}
        />
        <Divider />
        <Group justify="flex-end">
          <Button color="gray" onClick={close} variant="subtle">
            Cancel
          </Button>
          <Button
            loading={loading}
            onClick={handleSubmit}
            disabled={editName === ""}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

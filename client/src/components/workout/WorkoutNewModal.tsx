import React from "react";
import {
  Modal,
  TextInput,
  Text,
  Button,
  Stack,
  Group,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { v4 as uuidv4 } from "uuid";

import { workoutType } from "./workoutData";

export default function WorkoutNewModal({
  opened,
  close,
  setWorkout,
}: {
  opened: boolean;
  close: () => void;
  setWorkout: (workout: workoutType, message: string) => Promise<void>;
}) {
  const [workoutName, setWorkoutName] = React.useState("");
  const [loading, { toggle }] = useDisclosure();
  const validWorkout = workoutName !== "";

  React.useEffect(() => {
    setWorkoutName("");

    return () => {
      // Reset loading prop
      if (loading) {
        toggle();
      }
    };
  }, [opened]);

  // Create new empty workout
  const createWorkout = () => {
    toggle();
    const newWorkout = {
      id: uuidv4(),
      name: workoutName,
      lastAccessed: "",
      exercises: {},
      exerciseOrder: [],
      exerciseCount: 0,
    };

    setWorkout(newWorkout, "Workout created successfully!").then(() => {
      close();
    });
  };

  // Create workout on 'Enter' key press
  const handleEnterKey = (key: string) => {
    if (key === "Enter") {
      createWorkout();
    }
  };

  return (
    <Modal
      title={
        <Text fw={700} size="xl">
          New Workout
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
          label="Workout name"
          value={workoutName}
          onChange={(event) => setWorkoutName(event.currentTarget.value)}
          classNames={{
            label: "pb-2",
          }}
          onKeyDown={(event) => handleEnterKey(event.key)}
        />
        <Divider />
        <Group justify="flex-end">
          <Button color="gray" onClick={close} variant="subtle">
            Cancel
          </Button>
          <Button
            loading={loading}
            disabled={!validWorkout}
            onClick={createWorkout}
          >
            Create
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

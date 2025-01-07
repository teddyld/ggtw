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
import { v4 as uuidv4 } from "uuid";

import { workoutType } from "./workoutData";

export default function WorkoutNewModal({
  opened,
  close,
  setWorkout,
}: {
  opened: boolean;
  close: () => void;
  setWorkout: (workout: workoutType) => void;
}) {
  const [workoutName, setWorkoutName] = React.useState("");
  const validWorkout = workoutName !== "";

  React.useEffect(() => {
    setWorkoutName("");
  }, [opened]);

  // Create new empty workout
  const createWorkout = () => {
    close();
    const newWorkout = {
      id: uuidv4(),
      name: workoutName,
      exercises: {},
      exerciseOrder: [],
      exerciseCount: 0,
    };

    setWorkout(newWorkout);
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
          <Button disabled={!validWorkout} onClick={createWorkout}>
            Create
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

import React from "react";
import {
  Modal,
  Stack,
  Text,
  TextInput,
  Divider,
  Button,
  Group,
} from "@mantine/core";

import DeleteButton from "../layout/DeleteButton";

export default function WorkoutModal({
  name,
  removeWorkout,
  renameWorkout,
  opened,
  close,
}: {
  name: string;
  removeWorkout: () => void;
  renameWorkout: (newName: string) => void;
  opened: boolean;
  close: () => void;
}) {
  const [editName, setEditName] = React.useState("");

  React.useEffect(() => {
    setEditName(name);
  }, [opened]);

  // Rename workout when 'Enter' key is pressed with focus on TextInput
  const handleSubmit = (key: string) => {
    if (!editName || key !== "Enter") return;
    renameWorkout(editName);
  };

  return (
    <Modal
      title={
        <Text fw={500} size="xl">
          Workout
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
          value={editName}
          onChange={(event) => setEditName(event.currentTarget.value)}
          classNames={{
            label: "pb-2",
          }}
          error={editName === "" ? "Invalid name" : ""}
          onKeyDown={(event) => handleSubmit(event.key)}
        />
        <DeleteButton item="workout" handleDelete={removeWorkout} />
        <Divider />
        <Group justify="flex-end">
          <Button color="gray" onClick={close} variant="subtle">
            Cancel
          </Button>
          <Button
            disabled={editName === ""}
            onClick={() => renameWorkout(editName)}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

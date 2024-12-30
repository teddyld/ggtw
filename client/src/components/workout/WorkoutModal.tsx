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
  deleteWorkout,
  renameWorkout,
  opened,
  close,
}: {
  name: string;
  deleteWorkout: () => void;
  renameWorkout: (newName: string) => void;
  opened: boolean;
  close: () => void;
}) {
  const [editName, setEditName] = React.useState("");

  React.useEffect(() => {
    setEditName(name);
  }, [opened]);

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
        />
        <DeleteButton item="workout" handleDelete={deleteWorkout} />
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

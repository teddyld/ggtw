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
import { useDisclosure } from "@mantine/hooks";

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
  const [loading, { toggle }] = useDisclosure();

  React.useEffect(() => {
    setEditName(name);

    return () => {
      // Reset loading prop
      if (loading) {
        toggle();
      }
    };
  }, [opened]);

  // Rename workout when 'Enter' key is pressed with focus on TextInput
  const handleEnterKey = (key: string) => {
    if (!editName || key !== "Enter") return;
    handleSubmit();
  };

  const handleSubmit = () => {
    toggle();
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
          onKeyDown={(event) => handleEnterKey(event.key)}
          disabled={loading}
        />
        <DeleteButton
          item="workout"
          handleDelete={removeWorkout}
          disabled={loading}
        />
        <Divider />
        <Group justify="flex-end">
          <Button color="gray" onClick={close} variant="subtle">
            Cancel
          </Button>
          <Button
            loading={loading}
            onClick={() => handleSubmit()}
            disabled={editName === ""}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

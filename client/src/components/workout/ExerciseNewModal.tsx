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
import { FaPlus } from "react-icons/fa";

export default function ExerciseNewModal({
  createExercise,
}: {
  createExercise: (exerciseName: string) => Promise<void>;
}) {
  const [exerciseName, setExerciseName] = React.useState("");
  const [opened, { open, close }] = useDisclosure();

  const [loading, { toggle }] = useDisclosure();
  const validExercise = exerciseName !== "";

  React.useEffect(() => {
    setExerciseName("");

    return () => {
      // Reset loading prop
      if (loading) {
        toggle();
      }
    };
  }, [opened]);

  // Create exercise on 'Enter' key press
  const handleEnterKey = (key: string) => {
    if (key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    toggle();
    createExercise(exerciseName).then(() => {
      close();
    });
  };

  return (
    <>
      <Button
        w="100%"
        color="gray"
        variant="outline"
        leftSection={<FaPlus />}
        onClick={open}
      >
        New Exercise
      </Button>
      <Modal
        title={
          <Text fw={700} size="xl">
            New Exercise
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
            value={exerciseName}
            onChange={(event) => setExerciseName(event.currentTarget.value)}
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
              disabled={!validExercise}
              onClick={handleSubmit}
            >
              Create
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

import React from "react";
import axios from "axios";
import { Text, Button, Group, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAppSelector } from "../../store";
import { notifications } from "@mantine/notifications";

export default function DeleteStatistics() {
  const [loading, setLoading] = React.useState(false);
  const [opened, { open, close }] = useDisclosure();
  const userId = useAppSelector((state) => state.user.id);

  React.useEffect(() => {
    setLoading(false);
  }, [opened]);

  const handleReset = () => {
    setLoading(true);
    axios.put("/user/statistics/delete", { userId }).then(() => {
      close();
      notifications.show({ message: "Statistics successfully reset." });
    });
  };

  return (
    <>
      <Group justify="space-between" w="100%">
        <div>
          <Text fw={500}>Reset your statistics</Text>
          <Text c="dimmed">
            Reset your statistics and all its associated data
          </Text>
        </div>
        <Button onClick={open}>Reset statistics</Button>
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        size="md"
        centered
        withCloseButton={false}
      >
        <Stack align="center" gap="xs">
          <div className="text-center">
            <Text fw={700}>
              Are you sure you want to reset your statistics?
            </Text>
            <Text>This action is permanent and irreversible</Text>
          </div>
          <Group justify="center" w="100%">
            <Button color="gray" onClick={close}>
              Cancel
            </Button>
            <Button onClick={handleReset} loading={loading}>
              Reset statistics
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

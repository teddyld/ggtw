import React from "react";
import Container from "./Container";
import { Stack, Text, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function DeleteButton({
  item,
  handleDelete,
}: {
  item: string;
  handleDelete: () => void;
}) {
  const [deleteCard, setDeleteCard] = React.useState(false);
  const [loading, { toggle }] = useDisclosure();

  return (
    <>
      <Stack gap="xs">
        <Text fw={500} size="sm">
          Delete {item}
        </Text>
        <Button
          className={deleteCard ? "hidden" : "w-fit"}
          onClick={() => setDeleteCard(true)}
        >
          Delete {item}
        </Button>
      </Stack>
      <Container
        data-testid="deleteCard"
        aria-hidden={!deleteCard ? "true" : "false"}
        className={!deleteCard ? "hidden" : ""}
        p="sm"
      >
        <Stack gap="md">
          <Stack gap={5}>
            <Text size="sm">Are you sure you want to delete this {item}?</Text>
            <Text size="sm" c="red">
              This action is permanent and irreversible.
            </Text>
          </Stack>
          <Group justify="flex-end">
            <Button
              color="gray"
              variant="subtle"
              onClick={() => setDeleteCard(false)}
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              onClick={() => {
                toggle();
                handleDelete();
              }}
            >
              Delete {item}
            </Button>
          </Group>
        </Stack>
      </Container>
    </>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Text, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Container from "./Container";

export default function DeleteButton({
  item,
  handleDelete,
  disabled,
}: {
  item: string;
  handleDelete: () => void;
  disabled: boolean;
}) {
  const [deleteCard, setDeleteCard] = React.useState(false);
  const [loading, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <Stack gap="xs">
        <Text fw={500} size="sm">
          Delete {item}
        </Text>
        <Button
          className={deleteCard ? "hidden" : "w-fit"}
          onClick={() => setDeleteCard(true)}
          disabled={disabled}
        >
          Delete {item}
        </Button>
      </Stack>
      <Container
        data-testid="deleteCard"
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

                // Navigate back to WorkoutPage
                if (item === "workout") {
                  navigate("/workout");
                }
              }}
              disabled={disabled}
            >
              Delete {item}
            </Button>
          </Group>
        </Stack>
      </Container>
    </>
  );
}

import { Center, Button, Stack, Title, Text, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 636px)");

  return (
    <Center h="100vh" p="xl">
      <Group gap="xl" justify="center">
        <Text className="text-8xl" c="dimmed">
          404
        </Text>
        <Stack gap="sm" align={matches ? "flex-start" : "center"}>
          <Title size="xl">Page Not Found</Title>
          <Text>Sorry, we couldn't find the page you were looking for...</Text>
          <Button
            fullWidth={matches ? false : true}
            onClick={() => navigate("/")}
          >
            Go home
          </Button>
        </Stack>
      </Group>
    </Center>
  );
}

import { Title, Stack, Divider } from "@mantine/core";

import Container from "../layout/Container";
import DeleteStatistics from "./DeleteStatistics";

export default function Settings() {
  return (
    <Container p="lg">
      <Stack gap="xs" align="flex-start">
        <Title order={2} size="xl">
          Danger Zone
        </Title>
        <Divider w="100%" />
        <DeleteStatistics />
      </Stack>
    </Container>
  );
}

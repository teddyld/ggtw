import Layout from "../layout/Layout";
import { Skeleton, Stack } from "@mantine/core";

export default function WorkoutCardsLoading() {
  return (
    <Layout>
      <Stack gap="lg" w="100%">
        <Skeleton w="100%" h={185} radius="md" />
        <Skeleton w="100%" h={185} radius="md" />
        <Skeleton w="100%" h={185} radius="md" />
      </Stack>
    </Layout>
  );
}

import { Group, Skeleton } from "@mantine/core";

import Layout from "../layout/Layout";
import Container from "../layout/Container";

function WorkoutSkeleton() {
  return (
    <Container w={472}>
      <Skeleton height={60} mb="md" />
      <Group wrap="nowrap" justify="space-between" mb="md">
        <Skeleton height={28} width={200} />
        <Skeleton height={28} width={30} />
      </Group>
      <Skeleton height={22} width="100%" mb="md" />
      <Group mb="sm" wrap="nowrap">
        <Skeleton height={40} w={100} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </Group>
      <Group mb="sm" wrap="nowrap">
        <Skeleton height={40} w={100} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </Group>
      <Group mb="md" wrap="nowrap">
        <Skeleton height={40} w={100} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </Group>
      <Group wrap="nowrap" justify="space-between" mb="md">
        <Skeleton height={28} width={200} />
        <Skeleton height={28} width={30} />
      </Group>
      <Skeleton height={22} width="100%" mb="md" />
      <Group mb="sm" wrap="nowrap">
        <Skeleton height={40} w={100} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </Group>
      <Group mb="sm" wrap="nowrap">
        <Skeleton height={40} w={100} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </Group>
      <Group wrap="nowrap">
        <Skeleton height={40} w={100} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </Group>
    </Container>
  );
}

export default function WorkoutLoading() {
  return (
    <Layout>
      <WorkoutSkeleton />
    </Layout>
  );
}

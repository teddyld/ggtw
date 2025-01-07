import { Group, Skeleton } from "@mantine/core";

import Layout from "../layout/Layout";
import Container from "../layout/Container";

function WorkoutSkeleton() {
  return (
    <Container w="100%">
      <Skeleton height={40} mb="lg" />
      <Skeleton height={28} width={200} mb="sm" />
      <Skeleton height={22} width="25%" mb="xl" />
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
      <Group mb="xl" wrap="nowrap">
        <Skeleton height={40} w={100} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </Group>
      <Skeleton height={28} width={200} mb="sm" />
      <Skeleton height={22} width="100%" mb="xl" />
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
      <WorkoutSkeleton />
      <WorkoutSkeleton />
    </Layout>
  );
}

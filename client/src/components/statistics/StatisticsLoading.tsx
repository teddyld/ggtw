import { Loader, Group, Text } from "@mantine/core";
import Layout from "../layout/Layout";

export default function StatisticsLoading() {
  return (
    <Layout>
      <Group
        gap="xs"
        justify="center"
        align="center"
        className="pt-32"
        wrap="nowrap"
      >
        <Loader size="sm" />
        <Text fw={500} size="lg">
          Loading...
        </Text>
      </Group>
    </Layout>
  );
}

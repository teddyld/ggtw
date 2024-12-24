import { Skeleton } from "@mantine/core";

import Layout from "../layout/Layout";
import Container from "../layout/Container";

export default function WorkoutLoading() {
  return (
    <Layout>
      <Container p={0} w={472} >
        <Skeleton height={500} />
      </Container>
      <Container p={0} w={472} >
        <Skeleton height={500} />
      </Container>
    </Layout>
  );
}

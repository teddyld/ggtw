import React from "react";
import {
  Timeline,
  Title,
  Divider,
  Stack,
  Button,
  Highlight,
} from "@mantine/core";
import { SignInButton } from "@clerk/clerk-react";
import { FaPen, FaDumbbell, FaChartLine } from "react-icons/fa";

import Layout from "../components/layout/Layout";

import { useSignedIn } from "../hooks/useSignedIn";

export default function DashboardPage() {
  const [active, setActive] = React.useState(-1);

  const { handleSignedIn } = useSignedIn();

  return (
    <Layout>
      <Stack
        py={100}
        px={{ base: 10, sm: 100 }}
        className="text-center"
        align="center"
      >
        <Title>Workout tracking made fast</Title>
        <Highlight
          w={{ sm: 420 }}
          color="red"
          highlight={["workout plans", "track your progress"]}
        >
          Create your workout plans and track your progress. Use the ggtw
          platform for free to start tracking your workout today.
        </Highlight>
        <SignInButton mode="modal" forceRedirectUrl="/workout">
          <Button w={150} radius="xl" variant="light" onClick={handleSignedIn}>
            Get started
          </Button>
        </SignInButton>
      </Stack>
      <Divider w="100%" />
      <Stack
        py={100}
        px={{ base: 20, sm: 100 }}
        className="text-center"
        align="center"
      >
        <Title order={2}>How it works</Title>
        <Timeline active={active} bulletSize={24}>
          <Timeline.Item
            title="Design your program"
            bullet={<FaPen className="text-xs" />}
            onClick={() => {
              if (active === 0) {
                setActive(-1);
              } else {
                setActive(0);
              }
            }}
            className="cursor-pointer"
          >
            <Highlight
              c="dimmed"
              color="red"
              highlight={active >= 0 ? ["exercises", "muscle groups"] : []}
            >
              Fully customize your exercises and target muscle groups to suit
              your training goals.
            </Highlight>
          </Timeline.Item>
          <Timeline.Item
            title="Start training and tracking"
            bullet={<FaDumbbell className="text-xs" />}
            onClick={() => setActive(1)}
            className="cursor-pointer"
          >
            <Highlight
              c="dimmed"
              color="red"
              highlight={active >= 1 ? ["sets, reps, or time"] : []}
            >
              Log exercise sets, reps, or time with as few presses as possible
              to minimise your phone time.
            </Highlight>
          </Timeline.Item>
          <Timeline.Item
            title="Review and adapt to your growth"
            bullet={<FaChartLine className="text-xs" />}
            onClick={() => setActive(2)}
            className="cursor-pointer"
          >
            <Highlight
              c="dimmed"
              color="red"
              highlight={active === 2 ? ["statistics", "perfect"] : []}
            >
              View in-depth statistics of your training progress to perfect your
              training.
            </Highlight>
          </Timeline.Item>
        </Timeline>
      </Stack>
    </Layout>
  );
}

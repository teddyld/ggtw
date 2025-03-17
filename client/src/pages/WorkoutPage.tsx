import React from "react";
import { Text, Group, Center, Stack, Button, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaPlus } from "react-icons/fa";

import Layout from "../components/layout/Layout";

import WorkoutCardsLoading from "../components/workout/WorkoutCardsLoading";
import WorkoutTemplatesButton from "../components/workout/WorkoutTemplatesButton";
import WorkoutNewButton from "../components/workout/WorkoutNewButton";

import { useSignedIn } from "../hooks/useSignedIn";
import { useWorkout } from "../hooks/useWorkout";
import WorkoutCard from "../components/workout/WorkoutCard";

export default function WorkoutPage() {
  const { userWorkouts, workoutPending, setWorkout } = useWorkout();
  const [loading, { toggle }] = useDisclosure();

  useSignedIn();

  React.useEffect(() => {
    if (loading) {
      toggle();
    }
  }, [loading]);

  if (workoutPending) {
    return <WorkoutCardsLoading />;
  }

  return (
    <Layout>
      {userWorkouts.length === 0 ? (
        <>
          {loading && <Skeleton w="100%" h={185} radius="md" />}
          <Center h="80vh">
            <Stack gap={0} align="center">
              <Text pb="sm">Create your Workout to begin.</Text>
              <Group>
                <WorkoutNewButton setWorkout={setWorkout}>
                  New workout
                </WorkoutNewButton>
                <WorkoutTemplatesButton
                  setWorkout={setWorkout}
                  setLoading={toggle}
                >
                  Templates
                </WorkoutTemplatesButton>
              </Group>
            </Stack>
          </Center>
        </>
      ) : (
        <Stack gap="lg" w="100%">
          {userWorkouts.map((workout) => {
            return <WorkoutCard key={workout.id} workout={workout} />;
          })}
          {loading && <Skeleton w="100%" h={185} radius="md" />}
          <Button.Group className="self-center">
            <WorkoutNewButton
              setWorkout={setWorkout}
              leftSection={<FaPlus />}
              color="red"
              radius="lg"
              variant="outline"
            >
              Create
            </WorkoutNewButton>
            <WorkoutTemplatesButton
              setWorkout={setWorkout}
              setLoading={toggle}
              variant="outline"
              color="red"
              radius="lg"
            />
          </Button.Group>
        </Stack>
      )}
    </Layout>
  );
}

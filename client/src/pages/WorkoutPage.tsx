import { Text, Group, Center, Stack } from "@mantine/core";

import Layout from "../components/layout/Layout";

import WorkoutCardsLoading from "../components/workout/WorkoutCardsLoading";
import WorkoutTemplatesButton from "../components/workout/WorkoutTemplatesButton";
import WorkoutNewButton from "../components/workout/WorkoutNewButton";

import { useSignedIn } from "../hooks/useSignedIn";
import { useWorkout } from "../hooks/useWorkout";
import WorkoutCard from "../components/workout/WorkoutCard";

export default function WorkoutPage() {
  const { userWorkouts, workoutPending, setWorkout } = useWorkout();

  useSignedIn();

  if (workoutPending) {
    return <WorkoutCardsLoading />;
  }

  return (
    <Layout>
      {userWorkouts.length === 0 ? (
        <Center h="80vh">
          <Stack gap={0} align="center">
            <Text pb="sm">Create your Workout to begin.</Text>
            <Group>
              <WorkoutNewButton setWorkout={setWorkout}>
                New workout
              </WorkoutNewButton>
              <WorkoutTemplatesButton setWorkout={setWorkout}>
                Templates
              </WorkoutTemplatesButton>
            </Group>
          </Stack>
        </Center>
      ) : (
        <Stack gap="lg" w="100%">
          {userWorkouts.map((workout) => {
            return <WorkoutCard key={workout.id} workout={workout} />;
          })}
        </Stack>
      )}
    </Layout>
  );
}

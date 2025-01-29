import { Text, Group } from "@mantine/core";

import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";

import WorkoutList from "../components/workout/WorkoutList";
import WorkoutLoading from "../components/workout/WorkoutLoading";
import WorkoutTemplatesButton from "../components/workout/WorkoutTemplatesButton";
import WorkoutNewButton from "../components/workout/WorkoutNewButton";

import { useSignedIn } from "../hooks/useSignedIn";
import { useWorkout } from "../hooks/useWorkout";

export default function WorkoutPage() {
  const { userWorkouts, workoutPending, setWorkout, deleteWorkout } =
    useWorkout();

  useSignedIn();

  if (workoutPending) {
    return <WorkoutLoading />;
  }

  return (
    <Layout>
      {userWorkouts.length === 0 ? (
        <Container>
          <Text pb="sm">Create your Workout(s) to begin.</Text>
          <Group>
            <WorkoutNewButton setWorkout={setWorkout}>
              New workout
            </WorkoutNewButton>
            <WorkoutTemplatesButton setWorkout={setWorkout}>
              Templates
            </WorkoutTemplatesButton>
          </Group>
        </Container>
      ) : (
        <>
          {userWorkouts.map((workout) => {
            return (
              <WorkoutList
                key={workout.id}
                workout={workout}
                exerciseMap={workout.exercises}
                setWorkout={setWorkout}
                deleteWorkout={deleteWorkout}
              />
            );
          })}
        </>
      )}
    </Layout>
  );
}

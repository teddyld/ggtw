import { Text, Group } from "@mantine/core";

import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";

import { useWorkout } from "../hooks/useWorkout";
import WorkoutList from "../components/workout/WorkoutList";
import WorkoutLoading from "../components/workout/WorkoutLoading";
import WorkoutTemplatesButton from "../components/workout/WorkoutTemplatesButton";
import WorkoutNewButton from "../components/workout/WorkoutNewButton";

export default function WorkoutPage() {
  const { userWorkouts, workoutPending, setWorkout, deleteWorkout } =
    useWorkout();

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
          {userWorkouts.map((workout, index) => {
            return (
              <WorkoutList
                key={workout.id}
                workout={workout}
                index={index}
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

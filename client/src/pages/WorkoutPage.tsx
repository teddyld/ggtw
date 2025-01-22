import React from "react";
import axios from "axios";
import { Text, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";

import WorkoutList from "../components/workout/WorkoutList";
import WorkoutLoading from "../components/workout/WorkoutLoading";
import WorkoutTemplatesButton from "../components/workout/WorkoutTemplatesButton";
import WorkoutNewButton from "../components/workout/WorkoutNewButton";

import { useSignedIn } from "../hooks/useSignedIn";
import { useWorkout } from "../hooks/useWorkout";
import { useAppSelector, useAppDispatch } from "../store";
import { setUserWorkouts } from "../store/userReducer";

export default function WorkoutPage() {
  const { id, setWorkout, deleteWorkout } = useWorkout();
  const dispatch = useAppDispatch();

  const { isPending, data } = useQuery({
    queryKey: ["workouts", id],
    queryFn: () => axios.get(`/user/workouts/${id}`).then((res) => res.data),
    enabled: !!id // Only run when id is valid
  });

  const userWorkouts = useAppSelector((state) => state.user.userWorkouts);

  // Set user's workout from MongoDB on initial render
  React.useEffect(() => {
    if (!isPending) {
      if (data && data.workouts) {
        dispatch(setUserWorkouts(Object.values(data.workouts)));
      } else {
        dispatch(setUserWorkouts([]));
      }
    }
  }, [isPending]);

  useSignedIn();

  if (isPending) {
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

import { Text, Group } from "@mantine/core";

import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";

import { useProgram } from "../hooks/useProgram";
import WorkoutList from "../components/workout/WorkoutList";
import WorkoutLoading from "../components/workout/WorkoutLoading";
import WorkoutTemplatesButton from "../components/workout/WorkoutTemplatesButton";
import WorkoutNewButton from "../components/workout/WorkoutNewButton";

export default function WorkoutPage() {
  const { program, setProgram, programPending } = useProgram();

  if (programPending) {
    return <WorkoutLoading />;
  }

  return (
    <Layout>
      {program.length === 0 ? (
        <Container>
          <Text pb="sm">Create your Workout(s) to begin.</Text>
          <Group>
            <WorkoutNewButton program={program} setProgram={setProgram}>
              New workout
            </WorkoutNewButton>
            <WorkoutTemplatesButton program={program} setProgram={setProgram}>
              Templates
            </WorkoutTemplatesButton>
          </Group>
        </Container>
      ) : (
        <>
          {program.map((workout, i) => {
            return (
              <WorkoutList
                key={i}
                workout={workout}
                program={program}
                setProgram={setProgram}
              />
            );
          })}
        </>
      )}
    </Layout>
  );
}

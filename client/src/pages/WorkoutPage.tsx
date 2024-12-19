import { useUser } from "../hooks/useUser";
import Layout from "../components/layout/Layout";
import Container from "../components/layout/Container";

export default function WorkoutPage() {
  const { id, session, setSession, sessionPending } = useUser();

  return (
    <Layout>
      <Container>Workout {id}</Container>
    </Layout>
  );
}

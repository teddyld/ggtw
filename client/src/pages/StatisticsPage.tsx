import Layout from "../components/layout/Layout";

import { useSignedIn } from "../hooks/useSignedIn";

export default function StatisticsPage() {
  useSignedIn();

  return (
    <Layout>
      <div>Statistics</div>
    </Layout>
  );
}

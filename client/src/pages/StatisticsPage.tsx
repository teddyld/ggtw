import Layout from "../components/layout/Layout";
import StatisticsLoading from "../components/statistics/StatisticsLoading";

import { useStatistics } from "../hooks/useStatistics";

export default function StatisticsPage() {
  const { userStatistics, statisticsPending } = useStatistics();

  if (statisticsPending) {
    return <StatisticsLoading />;
  }

  return (
    <Layout>
      <div>{JSON.stringify(userStatistics)}</div>
    </Layout>
  );
}

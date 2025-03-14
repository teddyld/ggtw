import Layout from "../components/layout/Layout";
import ActivityStatistics from "../components/statistics/ActivityStatistics";
import ExerciseStatistics from "../components/statistics/ExerciseStatistics";
import StatisticsLoading from "../components/statistics/StatisticsLoading";

import { activityType } from "../components/statistics/statisticsData";
import { useSettings } from "../hooks/useSettings";
import { useStatistics } from "../hooks/useStatistics";

export default function StatisticsPage() {
  const { userStatistics, statisticsPending } = useStatistics();
  const { settingsPending } = useSettings();

  if (statisticsPending || settingsPending || !userStatistics) {
    return <StatisticsLoading />;
  }

  const userActivity: activityType[] = [];
  const datesWithActivity: Set<string> = new Set();

  for (const [date, activity] of Object.entries(userStatistics.activity)) {
    // Change date formatting to YYYY-MM-DD and convert to Date object
    const formatDate = new Date(date.split("/").reverse().join("-"));
    datesWithActivity.add(formatDate.toDateString());

    userActivity.push({
      activity,
      date: formatDate,
    });
  }

  const availableMuscleGroups: Set<string> = new Set();

  for (const [_, muscleGroups] of Object.entries(userStatistics.exercises)) {
    for (const muscle of muscleGroups) {
      if (!availableMuscleGroups.has(muscle)) {
        availableMuscleGroups.add(muscle);
      }
    }
  }

  return (
    <Layout>
      <ActivityStatistics
        startDate={userStatistics.startDate}
        activity={userActivity}
        datesWithActivity={datesWithActivity}
        personalBests={userStatistics.personalBests}
      />
      <ExerciseStatistics
        activity={userActivity}
        exercises={userStatistics.exercises}
        availableMuscleGroups={availableMuscleGroups}
      />
    </Layout>
  );
}

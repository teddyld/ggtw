import { Stack, Text } from "@mantine/core";
import { LineChart } from "@mantine/charts";

import ExercisePillGroup from "../workout/ExercisePillGroup";

import { activityType, exerciseRecordType, orderSets } from "./statisticsData";

export default function ExerciseChart({
  exerciseName,
  muscleGroups,
  activity,
  timePeriod,
  sortOrder,
}: {
  exerciseName: string;
  muscleGroups: string[];
  activity: activityType[];
  timePeriod: string | null;
  sortOrder: string | null;
}) {
  // Get all activity in timePeriod
  const activityInTimePeriod = () => {
    if (timePeriod === "All time") {
      return activity;
    }

    const endDate = new Date();
    const startDate = new Date();

    if (timePeriod === "7 days") {
      startDate.setDate(endDate.getDate() - 7);
    } else if (timePeriod === "30 days") {
      startDate.setDate(endDate.getDate() - 30);
    } else {
      startDate.setDate(endDate.getDate() - 365);
    }

    startDate.setHours(0, 0, 0, 0);

    return activity.filter((entry) => {
      entry.date.setHours(0, 0, 0, 0);
      return entry.date <= endDate && entry.date >= startDate;
    });
  };

  const data: exerciseRecordType[] = [];
  const activityTime = activityInTimePeriod();

  for (const record of activityTime) {
    // Exercise was not found in this record
    if (!record.activity[exerciseName]) {
      continue;
    }

    const orderedSets = orderSets(record.activity[exerciseName], sortOrder);
    const maxSet = orderedSets[0];

    const exerciseRecord: exerciseRecordType = {
      date: record.date.toLocaleString("en-us", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      "MAX Weight": maxSet.weight,
    };

    if (maxSet.reps !== -1) {
      exerciseRecord["MAX Reps"] = maxSet.reps;
    }

    if (maxSet.time !== -1) {
      exerciseRecord["MAX Time"] = maxSet.time;
    }

    data.push(exerciseRecord);
  }

  return (
    <>
      {data.length !== 0 && (
        <Stack gap="xs">
          <Text>{exerciseName}</Text>
          <ExercisePillGroup muscleGroups={muscleGroups} />
          <LineChart
            h={300}
            mt="lg"
            tooltipAnimationDuration={200}
            data={data}
            dataKey="date"
            series={[
              { name: "MAX Reps", color: "indigo.6" },
              { name: "MAX Weight", color: "blue.6" },
              { name: "MAX Time", color: "green.6" },
            ]}
            curveType="linear"
            lineChartProps={{ syncId: "exercise" }}
          />
        </Stack>
      )}
    </>
  );
}

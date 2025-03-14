import { Group, Stack, Title, Select } from "@mantine/core";

import Container from "../layout/Container";
import ExerciseChart from "./ExerciseChart";
import FilterDrawer from "./FilterDrawer";

import { useFilters } from "../../hooks/useFilters";
import { activityType } from "./statisticsData";

export default function ExerciseStatistics({
  activity,
  exercises,
  availableMuscleGroups,
}: {
  activity: activityType[];
  exercises: Record<string, string[]>;
  availableMuscleGroups: Set<string>;
}) {
  const {
    muscleFilter,
    timePeriod,
    setTime,
    sortOrder,
    setOrder,
    inMuscleFilter,
    changeMuscleFilter,
    clearMuscleFilter,
  } = useFilters();

  return (
    <>
      {Object.keys(exercises).length !== 0 && (
        <Container p="lg">
          <Stack gap="lg">
            <Title order={2} size="lg">
              Exercises
            </Title>
            <Group justify="space-between">
              <Group>
                <Select
                  label="Time"
                  data={["All time", "7 days", "30 days", "1 year"]}
                  value={timePeriod}
                  onChange={setTime}
                  allowDeselect={false}
                  w={100}
                />
                <Select
                  label="Sort by"
                  data={["Weight", "Reps", "Time"]}
                  value={sortOrder}
                  onChange={setOrder}
                  allowDeselect={false}
                  w={100}
                />
                <FilterDrawer
                  filter={muscleFilter}
                  muscleGroups={Array.from(availableMuscleGroups)}
                  changeFilter={changeMuscleFilter}
                  clearFilter={clearMuscleFilter}
                />
              </Group>
            </Group>
            {Object.keys(exercises).map((exerciseName, i) => {
              const muscleGroups = exercises[exerciseName];
              if (inMuscleFilter(muscleGroups)) {
                return (
                  <ExerciseChart
                    key={`exercise-chart-${i}`}
                    exerciseName={exerciseName}
                    muscleGroups={muscleGroups}
                    activity={activity}
                    timePeriod={timePeriod}
                    sortOrder={sortOrder}
                  />
                );
              }
            })}
          </Stack>
        </Container>
      )}
    </>
  );
}

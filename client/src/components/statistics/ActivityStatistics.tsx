import dayjs from "dayjs";
import { SegmentedControl, Group, Title, Text, Stack } from "@mantine/core";
import { Calendar } from "@mantine/dates";

import Container from "../layout/Container";

import { activityType } from "./statisticsData";

import { useMedia } from "../../hooks/useMedia";
import { useActivity } from "../../hooks/useActivity";

export default function ActivityStatistics({
  startDate,
  activity,
  datesWithActivity,
}: {
  startDate: Date;
  activity: activityType[];
  datesWithActivity: Set<string>;
}) {
  const { isMobile } = useMedia();
  const { period, control, selected, handleControl, handleSelect } =
    useActivity(datesWithActivity);

  return (
    <Container p="lg">
      <Stack>
        <Title order={2} size="lg">
          Activity
        </Title>
        <Group
          align="flex-start"
          justify={isMobile ? "center" : "space-between"}
        >
          <Stack>
            <SegmentedControl
              value={control}
              onChange={(value) => handleControl(value)}
              fullWidth
              data={[
                {
                  value: "week",
                  label: "This week",
                },
                {
                  value: "month",
                  label: "This month",
                },
                {
                  value: "year",
                  label: "This year",
                },
              ]}
            />
            <Calendar
              minDate={startDate}
              maxDate={new Date()}
              highlightToday
              getDayProps={(date) => ({
                selected: selected.some((s) => dayjs(date).isSame(s, "date")),
                onClick: () => handleSelect(date),
                className: datesWithActivity.has(date.toDateString())
                  ? "border-[1px] border-solid border-red-600"
                  : "cursor-not-allowed",
              })}
            />
          </Stack>
          <Stack className="flex-grow">
            <Stack className="self-center" gap={0} align="center">
              <Title order={3} size="md">
                Summary
              </Title>
              <Text c="dimmed" size="sm" className="text-center">
                {period.startDate.toString() !== period.endDate.toString()
                  ? `${period.startDate} - ${period.endDate}`
                  : period.startDate}
              </Text>
            </Stack>
          </Stack>
        </Group>
      </Stack>
    </Container>
  );
}

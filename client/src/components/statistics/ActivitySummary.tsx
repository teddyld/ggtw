import { Group, Stack, Text } from "@mantine/core";
import { useAppSelector } from "../../store";

import {
  activityType,
  summaryType,
  exerciseRecordType,
  createMaxRecord,
  pbType,
} from "./statisticsData";
import GreenUpAngle from "../icons/GreenUpAngle";
import YellowLine from "../icons/YellowLine";
import RedDownAngle from "../icons/RedDownAngle";

import { convertUnits } from "../../utils/unitConversion";

export default function ActivitySummary({
  period,
  activity,
  personalBests,
}: {
  period: { startDate: string; endDate: string };
  activity: activityType[];
  personalBests: pbType;
}) {
  const startDate = new Date(period.startDate);
  const endDate = new Date(period.endDate);
  const settings = useAppSelector((state) => state.user.settings);

  const activityInPeriod = activity.filter((entry) => {
    entry.date.setHours(0, 0, 0, 0);
    return entry.date <= endDate && entry.date >= startDate;
  });

  const summary: summaryType[] = [];
  const currentRecords: Record<string, exerciseRecordType> = {};

  // Define max weight for exercises in the current period (latest)
  for (const record of activityInPeriod) {
    for (const exerciseName in record.activity) {
      currentRecords[exerciseName] = createMaxRecord(
        record,
        exerciseName,
        "Weight",
        settings.units,
      );
    }
  }

  for (const exerciseName of Object.keys(currentRecords)) {
    const pb = personalBests[exerciseName];
    const pbWeight = convertUnits(pb.weight, pb.units, settings.units);
    const currentRecordWeight = convertUnits(
      currentRecords[exerciseName]["MAX Weight"],
      settings.units,
      settings.units,
    );

    const exerciseSummary: summaryType = {
      exerciseName,
      personalBest: {
        date: pb.date,
        "MAX Weight": pbWeight,
        "MAX Reps": pb.reps,
        "MAX Time": pb.time,
      },
      currentRecord: currentRecords[exerciseName],
      status: "UP",
    };

    if (pbWeight > currentRecordWeight) {
      exerciseSummary.status = "DOWN";
    } else if (pbWeight === currentRecordWeight) {
      exerciseSummary.status = "NO CHANGE";
    }

    summary.push(exerciseSummary);
  }

  const stringConstructor = (
    weight: number,
    reps: number | undefined,
    time: number | undefined,
  ) => {
    let str = ` ${weight}${settings.units}`;

    if (reps) {
      str += ` for ${reps} reps`;
      if (time) {
        str += ` and ${time} seconds`;
      }
    } else if (time) {
      str += ` for ${time} seconds`;
    }
    return str;
  };

  return (
    <Stack>
      {activityInPeriod.length === 0 ? (
        <Text>No activity logged!</Text>
      ) : (
        <Stack>
          {summary.map((exerciseSummary, i) => {
            return (
              <Stack key={`exerciseSummary-${i}`} gap={0}>
                <Group justify="space-between">
                  <Text fw={500}>{exerciseSummary.exerciseName}</Text>
                  {exerciseSummary.status === "UP" && <GreenUpAngle />}
                  {exerciseSummary.status === "DOWN" && <RedDownAngle />}
                  {exerciseSummary.status === "NO CHANGE" && <YellowLine />}
                </Group>

                <Text>
                  Personal best -
                  {stringConstructor(
                    exerciseSummary.personalBest["MAX Weight"],
                    exerciseSummary.personalBest["MAX Reps"],
                    exerciseSummary.personalBest["MAX Time"],
                  )}
                </Text>
                <Text>
                  Most recent -
                  {stringConstructor(
                    exerciseSummary.currentRecord["MAX Weight"],
                    exerciseSummary.currentRecord["MAX Reps"],
                    exerciseSummary.currentRecord["MAX Time"],
                  )}
                </Text>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}

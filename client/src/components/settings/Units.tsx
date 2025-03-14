import { Group, Text } from "@mantine/core";
import ChangeUnits from "../workout/ChangeUnits";
import { unitType } from "../workout/workoutData";

export default function Units({
  currentUnit,
  updateSettingsUnits,
}: {
  currentUnit: unitType;
  updateSettingsUnits: (value: unitType) => void;
}) {
  return (
    <Group justify="space-between" w="100%">
      <div>
        <Text fw={500}>Set default unit of measurement</Text>
        <Text c="dimmed">
          This unit will be used when displaying your statistics
        </Text>
      </div>
      <ChangeUnits
        initialUnits={currentUnit}
        changeUnits={updateSettingsUnits}
      />
    </Group>
  );
}

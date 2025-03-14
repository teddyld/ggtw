import { Title, Stack, Divider } from "@mantine/core";

import Container from "../layout/Container";
import SettingsLoading from "./SettingsLoading";
import Units from "./Units";
import DeleteStatistics from "./DeleteStatistics";

import { unitType } from "../workout/workoutData";
import { useSettings } from "../../hooks/useSettings";

export default function Settings() {
  const { userSettings, settingsPending, updateSettings } = useSettings();

  if (settingsPending || !userSettings) {
    return <SettingsLoading />;
  }

  const updateUnits = (value: unitType) => {
    updateSettings({
      ...userSettings,
      units: value,
    });
  };

  return (
    <Container p="lg">
      <Stack gap="xs" align="flex-start">
        <Title order={2} size="xl">
          Preferences
        </Title>
        <Divider />
        <Units
          currentUnit={userSettings.units}
          updateSettingsUnits={updateUnits}
        />
        <Title order={2} size="xl">
          Danger Zone
        </Title>
        <Divider w="100%" />
        <DeleteStatistics />
      </Stack>
    </Container>
  );
}

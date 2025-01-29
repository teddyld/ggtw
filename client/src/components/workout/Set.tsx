import { Group } from "@mantine/core";

import SetMenu from "./SetMenu";
import SetInput from "./SetInput";
import SetLog from "./SetLog";
import { setType, setInputTypes, exerciseTypes } from "./workoutData";

export default function Set({
  set,
  checked,
  logged,
  deleteSet,
  addSetBelow,
  updateSetValue,
  logSet,
}: {
  set: setType;
  checked: exerciseTypes;
  logged: Record<string, boolean>;
  deleteSet: () => void;
  addSetBelow: () => void;
  updateSetValue: (
    setId: string,
    newValue: number,
    type: setInputTypes,
  ) => void;
  logSet: () => void;
}) {
  const handleLog = () => {
    if (!logged[set.id]) {
      logSet();
    }
  };

  return (
    <Group gap="xs" wrap="nowrap" justify="center">
      <SetMenu deleteSet={deleteSet} addSetBelow={addSetBelow} />
      <SetInput
        initialValue={set.values.weight}
        setId={set.id}
        type="weight"
        updateSetValue={updateSetValue}
      />
      {checked.reps && (
        <SetInput
          initialValue={set.values.reps}
          setId={set.id}
          type="reps"
          updateSetValue={updateSetValue}
        />
      )}
      {checked.time && (
        <SetInput
          initialValue={set.values.time}
          setId={set.id}
          type="time"
          updateSetValue={updateSetValue}
        />
      )}
      <SetLog logged={logged[set.id]} handleLog={handleLog} />
    </Group>
  );
}

import { Group } from "@mantine/core";

import SetMenu from "./SetMenu";
import SetInput from "./SetInput";
import { setType, setInputTypes } from "./workoutData";

export default function Set({
  set,
  checked,
  deleteSet,
  addSetBelow,
  updateSetValue,
}: {
  set: setType;
  checked: { reps: boolean; time: boolean };
  deleteSet: () => void;
  addSetBelow: () => void;
  updateSetValue: (
    setId: string,
    newValue: number,
    type: setInputTypes,
  ) => void;
}) {
  const initialValue = {
    weight: set.values.weight,
    reps: set.values.reps,
    time: set.values.time,
  };

  return (
    <Group gap="xs" wrap="nowrap" justify="center">
      <SetMenu deleteSet={deleteSet} addSetBelow={addSetBelow} />
      <SetInput
        initialValue={initialValue.weight}
        setId={set.id}
        type="weight"
        updateSetValue={updateSetValue}
      />
      {checked.reps && (
        <SetInput
          initialValue={initialValue.reps}
          setId={set.id}
          type="reps"
          updateSetValue={updateSetValue}
        />
      )}
      {checked.time && (
        <SetInput
          initialValue={initialValue.time}
          setId={set.id}
          type="time"
          updateSetValue={updateSetValue}
        />
      )}
    </Group>
  );
}

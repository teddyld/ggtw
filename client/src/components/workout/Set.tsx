import { Group } from "@mantine/core";

import SetMenu from "./SetMenu";
import SetInput from "./SetInput";
import { setInputTypes, setType } from "./workoutData";

export default function Set({
  set,
  checked,
  updateSetValue,
  updateSets,
}: {
  set: setType;
  checked: { reps: boolean; time: boolean };
  updateSetValue: (setId: string, value: number, type: setInputTypes) => void;
  updateSets: (setId: string, action: "add" | "delete") => void;
}) {
  const initialValue = {
    weight: set.values.weight,
    reps: set.values.reps,
    time: set.values.time,
  };

  return (
    <Group gap="xs" wrap="nowrap" justify="center">
      <SetMenu
        deleteSet={() => updateSets(set.id, "delete")}
        addSetBelow={() => updateSets(set.id, "add")}
      />
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

import { Group } from "@mantine/core";

import SetMenu from "./SetMenu";
import SetInput from "./SetInput";
import SetLog from "./SetLog";
import { setType, exerciseTypes, setInputTypes } from "./workoutData";
import React from "react";

export default function Set({
  set,
  changeSetValue,
  checked,
  logged,
  deleteSet,
  addSetBelow,
  logSet,
  edit,
  canceled,
  makeEdit,
}: {
  set: setType;
  changeSetValue: (setId: string, value: number, type: setInputTypes) => void;
  checked: exerciseTypes;
  logged: Record<string, boolean>;
  deleteSet: () => void;
  addSetBelow: () => void;
  logSet: () => void;
  edit: boolean;
  canceled: boolean;
  makeEdit: () => void;
}) {
  const handleLog = () => {
    if (!logged[set.id] && !edit) {
      logSet();
    }
  };

  const [currentValues, setCurrentValues] = React.useState({
    weight: set.values.weight,
    time: set.values.time,
    reps: set.values.reps,
  });

  const handleOnChange = (value: string | number, type: setInputTypes) => {
    makeEdit();
    changeSetValue(set.id, Number(value), type);
    const newValues = structuredClone(currentValues);
    newValues[type] = Number(value);
    setCurrentValues(newValues);
  };

  React.useEffect(() => {
    if (!edit && canceled) {
      setCurrentValues({
        weight: set.values.weight,
        time: set.values.time,
        reps: set.values.reps,
      });
    }
  }, [edit, canceled]);

  return (
    <Group gap="xs" wrap="nowrap" justify="center">
      <SetMenu deleteSet={deleteSet} addSetBelow={addSetBelow} />
      <SetInput
        value={currentValues.weight}
        setId={set.id}
        type="weight"
        handleOnChange={handleOnChange}
        makeEdit={makeEdit}
      />
      {checked.reps && (
        <SetInput
          value={currentValues.reps}
          setId={set.id}
          type="reps"
          handleOnChange={handleOnChange}
          makeEdit={makeEdit}
        />
      )}
      {checked.time && (
        <SetInput
          value={currentValues.time}
          setId={set.id}
          type="time"
          handleOnChange={handleOnChange}
          makeEdit={makeEdit}
        />
      )}
      <SetLog logged={logged[set.id]} edit={edit} handleLog={handleLog} />
    </Group>
  );
}

import React from "react";

import { setType, setInputTypes } from "./workoutData";
import Set from "./Set";

type SetListType = {
  set: setType;
  checked: { reps: boolean; time: boolean };
  updateSetValue: (setId: string, value: number, type: setInputTypes) => void;
  updateSets: (setId: string, action: "add" | "delete") => void;
};

const SetList = React.memo(
  ({ set, checked, updateSetValue, updateSets }: SetListType) => {
    return (
      <Set
        set={set}
        checked={checked}
        updateSetValue={updateSetValue}
        updateSets={updateSets}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.set === nextProps.set && prevProps.checked === nextProps.checked,
);

export default SetList;

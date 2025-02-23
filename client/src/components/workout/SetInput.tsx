import React from "react";
import { NumberInput } from "@mantine/core";

import { setInputTypes } from "./workoutData";

export default function SetInput({
  initialValue,
  setId,
  type,
  updateSetValue,
}: {
  initialValue: number;
  setId: string;
  type: setInputTypes;
  updateSetValue: (
    setId: string,
    newValue: number,
    type: setInputTypes,
  ) => void;
}) {
  const [value, setValue] = React.useState<string | number>(initialValue);

  const handleChange = (value: string | number) => {
    console.log("called");
    setValue(value);
    updateSetValue(setId, Number(value), type);
  };

  return (
    <NumberInput
      classNames={{
        input: "text-center flex-grow",
      }}
      aria-label={`${type} input of exercise ${setId} `}
      allowLeadingZeros={false}
      variant="filled"
      allowNegative={false}
      placeholder={type.toUpperCase()}
      value={value}
      onChange={handleChange}
      hideControls
      className="w-full min-w-16"
    />
  );
}

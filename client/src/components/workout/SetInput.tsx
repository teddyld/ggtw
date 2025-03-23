import { NumberInput } from "@mantine/core";

import { setInputTypes } from "./workoutData";

export default function SetInput({
  value,
  setId,
  type,
  handleOnChange,
  makeEdit,
}: {
  value: number;
  setId: string;
  type: setInputTypes;
  handleOnChange: (value: string | number, type: setInputTypes) => void;
  makeEdit: () => void;
}) {
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
      onChange={(value) => handleOnChange(value, type)}
      onClick={makeEdit}
      hideControls
      className="w-full min-w-16"
    />
  );
}

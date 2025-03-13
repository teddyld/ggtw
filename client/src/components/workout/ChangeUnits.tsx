import React from "react";
import { SegmentedControl } from "@mantine/core";

import { unitType } from "./workoutData";

export default function ChangeUnits({
  initialUnits,
  changeUnits,
}: {
  initialUnits: string;
  changeUnits: (value: "kg" | "lbs") => void;
}) {
  const [units, setUnits] = React.useState(initialUnits);

  const handleChange = (value: string) => {
    setUnits(value);
    changeUnits(value as unitType);
  };

  return (
    <SegmentedControl
      value={units}
      onChange={handleChange}
      data={["kg", "lbs"]}
    />
  );
}

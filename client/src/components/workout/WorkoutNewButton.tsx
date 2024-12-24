import { Button } from "@mantine/core";

import { emptyWorkout, workoutButtonType } from "./workoutData";

export default function WorkoutNewButton({
  program,
  setProgram,
  children,
  ...rest
}: workoutButtonType) {
  const addEmptyWorkout = () => {
    const newProgram = [...program, emptyWorkout];
    setProgram(newProgram);
  };

  const { color } = rest.color ? rest : { color: "gray" };

  return (
    <Button {...rest} color={color} onClick={() => addEmptyWorkout()}>
      {children}
    </Button>
  );
}

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import WorkoutNewModal from "./WorkoutNewModal";
import { WorkoutButtonType } from "./workoutData";

export default function WorkoutNewButton({
  setWorkout,
  children,
  ...rest
}: WorkoutButtonType) {
  const { color } = rest.color ? rest : { color: "gray" };
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Button {...rest} color={color} onClick={open}>
        {children}
      </Button>
      <WorkoutNewModal opened={opened} close={close} setWorkout={setWorkout} />
    </>
  );
}

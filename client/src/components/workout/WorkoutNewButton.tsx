import { Button, ButtonProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import WorkoutNewModal from "./WorkoutNewModal";
import { workoutType } from "./workoutData";

export default function WorkoutNewButton({
  setWorkout,
  children,
  ...rest
}: ButtonProps & {
  setWorkout: (workout: workoutType, message: string) => Promise<void>;
  children: React.ReactNode;
}) {
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

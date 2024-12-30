import React from "react";

import { workoutState, programState } from "./workoutData";
import Workout from "./Workout";

type WorkoutListType = {
  workout: workoutState;
  program: programState;
  setProgram: (program: programState) => Promise<void>;
};

const WorkoutList = React.memo(
  ({ workout, program, setProgram }: WorkoutListType) => {
    return (
      <Workout workout={workout} program={program} setProgram={setProgram} />
    );
  },
  (prevProps, nextProps) => prevProps.workout === nextProps.workout,
);

export default WorkoutList;

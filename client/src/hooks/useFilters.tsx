import React from "react";

export const useFilters = () => {
  const [muscleFilter, setMuscles] = React.useState<string[]>([]);
  const [timePeriod, setTime] = React.useState<string | null>("All time");
  const [sortOrder, setOrder] = React.useState<string | null>("Weight");

  const inMuscleFilter = (muscleGroups: string[]) => {
    let hide = true;

    if (muscleFilter.length !== 0) {
      for (const idx in muscleFilter) {
        if (!muscleGroups.includes(muscleFilter[idx])) {
          hide = false;
        }
      }
    }
    return hide;
  };

  const changeMuscleFilter = (newFilter: string[]) => {
    setMuscles([...newFilter]);
  };

  const clearMuscleFilter = () => {
    setMuscles([]);
  };

  return {
    muscleFilter,
    timePeriod,
    setTime,
    sortOrder,
    setOrder,
    inMuscleFilter,
    changeMuscleFilter,
    clearMuscleFilter,
  };
};

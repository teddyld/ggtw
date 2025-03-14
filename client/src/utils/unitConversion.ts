import { unitType } from "../components/workout/workoutData";

const lbs2kg = (lbs: number) => {
  return Math.round(lbs * 0.45359237);
};

const kg2lbs = (kg: number) => {
  return Math.round(kg * 2.2046226218);
};

export const convertUnits = (value: number, from: unitType, to: unitType) => {
  if (from === "lbs" && to === "kg") {
    return lbs2kg(value);
  } else if (from === "kg" && to === "lbs") {
    return kg2lbs(value);
  } else {
    return value;
  }
};

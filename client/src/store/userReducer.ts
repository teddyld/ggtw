import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { workoutType } from "../components/workout/workoutData";
import axios from "axios";

type userState = {
  id: string;
  userWorkouts: workoutType[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

const initialState: userState = {
  id: "",
  userWorkouts: [], // Facilitate client fetching of boards
  status: "idle",
  error: null,
};

export const setWorkout = createAsyncThunk(
  "workout/update",
  async ({ userId, workout }: { userId: string; workout: workoutType }) => {
    await axios.put("user/workout/update", {
      userId,
      workout,
    });
    return workout;
  },
);

export const deleteWorkout = createAsyncThunk(
  "workout/delete",
  async ({ userId, workoutId }: { userId: string; workoutId: string }) => {
    await axios.put("user/workout/delete", {
      userId,
      workoutId,
    });
    return workoutId;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setUserWorkouts: (state, action: PayloadAction<workoutType[]>) => {
      state.userWorkouts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setWorkout.pending, (state, _) => {
        state.status = "pending";
      })
      .addCase(
        setWorkout.fulfilled,
        (state, action: PayloadAction<workoutType>) => {
          state.status = "succeeded";
          const newWorkouts = Array.from(state.userWorkouts);
          const workoutIndex = newWorkouts.findIndex(
            (workout) => workout.id === action.payload.id,
          );

          // Add to userWorkouts if workout does not exist
          if (workoutIndex === -1) {
            newWorkouts.push(action.payload);
          } else {
            newWorkouts[workoutIndex] = action.payload;
          }

          state.userWorkouts = newWorkouts;
        },
      )
      .addCase(setWorkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(deleteWorkout.pending, (state, _) => {
        state.status = "pending";
      })
      .addCase(
        deleteWorkout.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          const newWorkouts = Array.from(state.userWorkouts);
          const workoutIndex = newWorkouts.findIndex(
            (workout) => workout.id === action.payload,
          );
          newWorkouts.splice(workoutIndex, 1);
          state.userWorkouts = newWorkouts;
        },
      )
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { setUserId, setUserWorkouts } = userSlice.actions;
export default userSlice.reducer;

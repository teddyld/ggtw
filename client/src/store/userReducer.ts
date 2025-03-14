import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { workoutType } from "../components/workout/workoutData";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { settingsType } from "../components/settings/settingsData";

type userState = {
  id: string;
  userWorkouts: workoutType[];
  settings: settingsType | {};
  status: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: userState = {
  id: "",
  userWorkouts: [], // Facilitate client fetching of user workouts
  settings: {},
  status: "idle",
};

type WorkoutPayloadType = {
  workout: workoutType;
  message: string;
};

type SettingsPayloadType = {
  settings: settingsType;
};

export const setWorkout = createAsyncThunk(
  "workout/update",
  async ({
    userId,
    workout,
    message,
  }: {
    userId: string;
    workout: workoutType;
    message: string;
  }) => {
    await axios.put("user/workout/update", {
      userId,
      workout,
    });
    return { workout, message };
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

export const updateSettings = createAsyncThunk(
  "settings/update",
  async ({ userId, settings }: { userId: string; settings: settingsType }) => {
    await axios.put("user/settings/update", {
      userId,
      settings,
    });
    return { settings };
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
        (state, action: PayloadAction<WorkoutPayloadType>) => {
          state.status = "succeeded";
          const newWorkouts = Array.from(state.userWorkouts);
          const workoutIndex = newWorkouts.findIndex(
            (workout) => workout.id === action.payload.workout.id,
          );

          // Add to userWorkouts if workout does not exist
          if (workoutIndex === -1) {
            newWorkouts.push(action.payload.workout);
          } else {
            newWorkouts[workoutIndex] = action.payload.workout;
          }

          state.userWorkouts = newWorkouts;

          // Create notification
          if (action.payload.message) {
            notifications.show({ message: action.payload.message });
          }
        },
      )
      .addCase(setWorkout.rejected, (state, _) => {
        state.status = "failed";
        notifications.show({
          message: "An error occurred. Please try again later.",
        });
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
          notifications.show({
            message: "Workout deleted successfully.",
          });
        },
      )
      .addCase(deleteWorkout.rejected, (state, _) => {
        state.status = "failed";
        notifications.show({
          message: "An error occurred. Please try again later.",
        });
      })
      .addCase(updateSettings.pending, (state, _) => {
        state.status = "pending";
      })
      .addCase(
        updateSettings.fulfilled,
        (state, action: PayloadAction<SettingsPayloadType>) => {
          state.status = "succeeded";
          state.settings = action.payload.settings;
          notifications.show({
            message: "Settings updated successfully.",
          });
        },
      )
      .addCase(updateSettings.rejected, (state, _) => {
        state.status = "failed";
        notifications.show({
          message: "An error occurred. Please try again later.",
        });
      });
  },
});

export const { setUserId, setUserWorkouts } = userSlice.actions;
export default userSlice.reducer;

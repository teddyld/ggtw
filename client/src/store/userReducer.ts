import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type programState = {
  [key: string]: string | string[] | number | number[] | programState;
}[];

type userState = {
  id: string;
  program: programState;
};

const initialState: userState = {
  id: "",
  program: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStoreId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setStoreProgram: (state, action: PayloadAction<programState>) => {
      state.program = action.payload;
    },
  },
});

export const { setStoreId, setStoreProgram } = userSlice.actions;
export default userSlice.reducer;

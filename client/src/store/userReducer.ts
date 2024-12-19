import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type sessionState = {
  [key: string]: string | string[] | number | number[] | sessionState;
};

type userState = {
  id: string;
  session: sessionState;
};

const initialState: userState = {
  id: "",
  session: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStoreId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setStoreSession: (state, action: PayloadAction<sessionState>) => {
      state.session = action.payload;
    },
  },
});

export const { setStoreId, setStoreSession } = userSlice.actions;
export default userSlice.reducer;

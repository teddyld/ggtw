import { createSlice } from "@reduxjs/toolkit";

type navbarState = {
  value: boolean;
};

const initialState: navbarState = {
  value: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;

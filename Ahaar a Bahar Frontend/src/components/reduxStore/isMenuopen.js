import { createSlice } from "@reduxjs/toolkit";

const isMenuOpen = createSlice({
  name: "isMenuopen",
  initialState: false,
  reducers: {
    togglemenu: (state, action) => {
      return (state = !state);
    },
  },
});

export const { togglemenu } = isMenuOpen.actions;
export default isMenuOpen.reducer;

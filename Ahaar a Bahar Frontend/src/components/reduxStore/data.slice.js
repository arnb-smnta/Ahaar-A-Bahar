import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    homePageData: null,
  },
  reducers: {
    addHomePageData: (state, action) => {
      state.homePageData = action.payload;
    },
  },
});

export const { addHomePageData } = dataSlice.actions;
export default dataSlice.reducer;

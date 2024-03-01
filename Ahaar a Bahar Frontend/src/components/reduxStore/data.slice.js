import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    homePageData: null,
    restaurantData: {},
  },
  reducers: {
    addHomePageData: (state, action) => {
      state.homePageData = action.payload;
    },
    addRestaurantData: (state, action) => {
      const { key, data } = action.payload;
      state.restaurantData[key] = data;
    },
  },
});

export const { addHomePageData, addRestaurantData } = dataSlice.actions;
export default dataSlice.reducer;

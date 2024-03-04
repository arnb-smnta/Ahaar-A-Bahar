import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    homePageData: null,
    restaurantData: {},
    supportData: {},
  },
  reducers: {
    addHomePageData: (state, action) => {
      state.homePageData = action.payload;
    },
    addRestaurantData: (state, action) => {
      const { key, data } = action.payload;
      state.restaurantData[key] = data;
    },
    addSupportData: (state, action) => {
      const { key, data } = action.payload;
      state.supportData[key] = data;
    },
  },
});

export const { addHomePageData, addRestaurantData, addSupportData } =
  dataSlice.actions;
export default dataSlice.reducer;

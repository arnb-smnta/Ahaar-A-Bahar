import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./data.slice";
const appstore = configureStore({
  reducer: {
    data: dataSlice,
  },
});
export default appstore;

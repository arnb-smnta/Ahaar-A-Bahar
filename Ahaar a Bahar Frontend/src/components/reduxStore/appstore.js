import { configureStore } from "@reduxjs/toolkit";
import isMenuOpenreducer from "./isMenuopen";
const appstore = configureStore({
  reducer: {
    isMenuopen: isMenuOpenreducer,
  },
});
export default appstore;

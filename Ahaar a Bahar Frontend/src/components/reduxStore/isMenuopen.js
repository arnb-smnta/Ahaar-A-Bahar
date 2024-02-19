import { createSlice } from "@reduxjs/toolkit";

const isMenuOpen = createSlice({
  name: "isMenuopen",
  initialState: {
    createAccountMenu: false,
    forgotAccountMenu: false,
  },
  reducers: {
    togglemenu: (state, action) => {
      state.createAccountMenu = !state.createAccountMenu;
    },
    toggleforgotPasswordMenu: (state, action) => {
      state.forgotAccountMenu = !state.forgotAccountMenu;
    },
  },
});

export const { togglemenu, toggleforgotPasswordMenu } = isMenuOpen.actions;
export default isMenuOpen.reducer;

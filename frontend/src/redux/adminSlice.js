import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authAdmin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAuthAdmin: (state, action) => {
      state.authAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("RESET_STATE", () => initialState);
  },
});

export const { setAuthAdmin } = adminSlice.actions;
export default adminSlice.reducer;

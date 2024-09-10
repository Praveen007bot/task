import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("RESET_STATE", () => initialState);
  },
});

export const { setAuthUser } = userSlice.actions;
export default userSlice.reducer;

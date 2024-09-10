import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  goals: null,
};

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    setGoals: (state, action) => {
      state.goals = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("RESET_STATE", () => initialState);
  },
});

export const { setGoals } = goalSlice.actions;
export default goalSlice.reducer;

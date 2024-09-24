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
    updateGoal: (state, action) => {
      const updatedGoal = action.payload;
      // Ensure goals is not null and then map through to update the specific goal
      if (state.goals) {
        state.goals = state.goals.map((goal) =>
          goal._id === updatedGoal._id ? updatedGoal : goal
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase("RESET_STATE", () => initialState);
  },
});

export const { setGoals, updateGoal } = goalSlice.actions;
export default goalSlice.reducer;

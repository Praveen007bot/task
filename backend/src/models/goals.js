import mongoose from "mongoose";
const Schema = mongoose.Schema;

// SubGoal Schema
const SubGoalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Main Goal Schema
const GoalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // In days or any unit
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    subGoals: [SubGoalSchema], // Array of sub-goals
  },
  { timestamps: true }
);

export const Goal = mongoose.model("Goal", GoalSchema);


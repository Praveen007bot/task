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
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subGoals: [SubGoalSchema], // Array of sub-goals

    // Timer fields
    totalTimeSpent: {
      type: Number,
      default: 0, // Time in hours
    },
    lastStartTime: {
      type: Date, // Tracks when the timer was last started
    },
  },
  { timestamps: true }
);

export const Goal = mongoose.model("Goal", GoalSchema);

import { Goal } from "../models/goals.js";
import { User } from "../models/user.js";

export const addGoal = async (req, res) => {
  try {
    const userId = req.id; // Get the user ID from the request
    const { title, description, category, subGoals } = req.body;

    // Check for required fields
    if (!(title && description && category && subGoals)) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check for existing goal
    const existingGoal = await Goal.findOne({ title });
    if (existingGoal) {
      return res
        .status(401)
        .json({ message: "Goal already exists", success: false });
    }

    // Calculate the duration based on the number of sub-goals
    const duration = subGoals.length;

    // Create a new goal with sub-goals
    const newGoal = await Goal.create({
      title,
      description,
      category,
      duration, // Set duration based on the number of sub-goals
      userId,
      subGoals, // Include sub-goals in the new goal
    });

    // Update user's goals array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { goals: newGoal._id } },
      { new: true } // This returns the updated user object
    );

    // Check if the user was updated
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    console.log("Updated User:", updatedUser);

    // Respond with success message and new goal
    return res.status(200).json({
      message: "Goal added successfully.",
      goal: newGoal,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};


export const getAllGoals = async (req, res) => {
  try {
    const userId = req.id;
    const goals = await Goal.find({ userId });
    return res.status(200).json({
      message: "ok",
      goals,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res
        .status(404)
        .json({ message: "goal not found", success: false });
    }
    return res.status(200).json({ message: "ok", goal, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { goalId, status } = req.body;
    if (!(goalId && status)) {
      return res
        .status(404)
        .json({ message: "field in missing", success: false });
    }
    await Goal.findByIdAndUpdate(goalId, { status });

    const updatedGoal = await Goal.findById(goalId);

    return res.status(200).json({ message: "ok", updatedGoal, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const editGoal = async (req, res) => {
  try {
    const { title, description, category, duration, goalId } = req.body;
    const update = {
      title,
      description,
      category,
      duration,
    };
    const goal = await Goal.findById(goalId);
    await Goal.updateOne(update);

    return res
      .status(200)
      .json({ message: "Goal updated successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const userId = req.id;
    const { goalId } = req.body;
    const goal = await Goal.findById(goalId);
    await Goal.deleteOne(goal);

    const user = await User.findById(userId);
    if (user) {
      user.goals = user.goals.filter(goal => goal.toString() !== goalId); 
      await user.save(); 
    }

    return res
      .status(200)
      .json({ message: "Goal deleted successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getCompletedGoals = async (req, res) => {
  try {
    const userId = req.id;
    const goals = await Goal.find({ userId });
    return res.status(200).json({
      message: "ok",
      goals,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
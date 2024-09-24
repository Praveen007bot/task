import { Goal } from "../models/goals.js";
import { User } from "../models/user.js";

export const addGoal = async (req, res) => {
  try {
    const userId = req.id;
    console.log(userId);
    
    const { title, description, category, duration } = req.body;

    if (!(title && description && category && duration)) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const existingGoal = await Goal.findOne({ title });
    if (existingGoal) {
      return res
        .status(401)
        .json({ message: "goal already exist", success: false });
    }
    const newGoal = await Goal.create({
      title,
      description,
      category,
      duration,
      userId,
    });


    const user = await User.findById(userId);
    console.log(user);
    

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { goals: newGoal._id } },
      { new: true } // This returns the updated user object
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    console.log("Updated User:", updatedUser); 

    return res.status(200).json({
      message: "Goal added successfully.",
      goal: newGoal,
      success: true,
    });
  } catch (error) {
    console.log(error);
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
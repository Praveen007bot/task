import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    
    if (!(username && email && password)) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      message: "User created successfully",
      user: newUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res
        .status(402)
        .json({ message: "password is incorrect", success: false });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    user.password = undefined;
    return res
      .status(200)
      .cookie("userToken", token, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
        samesite: "strict",
      })
      .json({ message: "Login successfully", user, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the token by setting an expired cookie
    return res
      .status(200)
      .cookie("userToken", "", {
        httpOnly: true, // Ensure cookie is inaccessible via JavaScript
        secure: process.env.NODE_ENV === "production", // Send cookie only over HTTPS in production
        sameSite: "strict", // Prevent CSRF attacks
        expires: new Date(0), // Set an expired date to clear the cookie
      })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log("Logout error:", error);
    return res.status(500).json({ message: "Logout failed", success: false });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude the password field
    
    res.status(200).json(users); // Send back the users without password
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
}



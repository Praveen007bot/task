import { Admin } from "../models/admin.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log(username, email, password);
      
      if (!(username && email && password)) {
        return res
          .status(400)
          .json({ message: "All fields are required", success: false });
      }
      const admin = await Admin.findOne({ email });
      if (admin) {
        return res
          .status(401)
          .json({ message: "Admin already exists", success: false });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await Admin.create({
        username,
        email,
        password: hashedPassword,
      });
      return res.status(200).json({
        message: "Admin created successfully",
        admin: newAdmin,
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
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res
          .status(404)
          .json({ message: "Admin not found", success: false });
      }
      const isCorrectPassword = await bcrypt.compare(password, admin.password);
      if (!isCorrectPassword) {
        return res
          .status(402)
          .json({ message: "password is incorrect", success: false });
      }
      const tokenData = {
        adminId: admin._id,
      };
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      admin.password = undefined;
      return res
        .status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          samesite: "strict",
        })
        .json({ message: "Login successfully", admin, success: true });
    } catch (error) {
      console.log(error);
    }
  };



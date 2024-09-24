import express from "express";
import { getAllUsers, login, logout, register } from "../controllers/userController.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout);
route.get("/", getAllUsers)

export default route;

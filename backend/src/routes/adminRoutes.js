import express from "express";
import { login, logout, register } from "../controllers/adminController.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout);

export default route;

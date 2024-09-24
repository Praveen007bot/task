import express from "express";
import { logout, register } from "../controllers/adminController.js";
import { login } from "../controllers/adminController.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/logout", logout);

export default route;

import express from "express";
import {
  addGoal,
  changeStatus,
  deleteGoal,
  editGoal,
  getAllGoals,
  getCompletedGoals,
  getSingleGoal,
} from "../controllers.js/goalcontroller.js";
import { isAunthenticated } from "../middleware/isAuthenticated.js";

const route = express.Router();

route.post("/add", isAunthenticated, addGoal);
route.get("/", isAunthenticated, getAllGoals);
route.get("/:id", isAunthenticated, getSingleGoal);
route.post("/changestatus", isAunthenticated, changeStatus);
route.put("/edit", isAunthenticated, editGoal);
route.delete("/delete", deleteGoal);
route.get("/completed", isAunthenticated, getCompletedGoals);

export default route;

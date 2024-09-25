import React, { useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGoals } from "../redux/goalSlice";
import GoalItem from "./GoalItem";
import store from "../redux/store";

const Goals = () => {
  const dispatch = useDispatch();
  const { goals } = useSelector((store) => store.goal);
  const getAllGoals = async (req, res) => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/goal", {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(setGoals(res.data?.goals));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllGoals();
  }, [goals, store]);

  

  return (
    <>
      <Header />
      <div className="container mx-auto text-center">
        <h4 className="text-2xl font-semibold mb-4 mt-4">Your Goals</h4>
        {goals ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <p>No goals added yet.</p>
        )}
      </div>
    </>
  );
};

export default Goals;

import axios from "axios";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import EditModel from "./EditModel";
import { useDispatch } from "react-redux";
import { updateGoal } from "../redux/goalSlice";
import { API_URL } from "../constants/api";

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  const [showModel, setShowModel] = useState(false);

  // Function to change the goal status
  const newStatus = goal.status === "pending" ? "completed" : "pending";

  // Function to change the goal status in the backend
  const changeStatus = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/goal/changestatus`,
        { goalId: goal._id, status: newStatus }, // Use newStatus instead of status
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        dispatch(updateGoal(res.data.updatedGoal)); // Ensure you're dispatching the updated goal
        toast.success(res.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating status.");
    }
  };

  const handleButtonClick = () => {
    changeStatus();
  };

  // Function to handle goal deletion
  const handleDelete = () => {
    deleteGoal();
  };

  // Function to delete a goal in the backend
  const deleteGoal = async () => {
    try {
      const res = await axios.request({
        method: "DELETE",
        url: `${API_URL}/api/v1/goal/delete`,
        data: { goalId: goal._id }, // Pass goalId in request body
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data?.success) {
        dispatch(updateGoal(res.data?.goal)); // Update Redux store
        toast.success(res.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold">{goal.title}</h5>
        <button
          onClick={() => setShowModel(true)}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-200"
        >
          <FaRegEdit className="text-black" />
        </button>
      </div>
      <p className="mb-2">
        <strong>Category:</strong> {goal.category}
      </p>
      <p className="mb-2">
        <strong>Duration:</strong> {goal.duration} days
      </p>
      <p className="mb-2">
        <strong>Favorites:</strong> {goal.isFavorite ? "Yes" : "No"}
      </p>
      <p className="mb-2">
        <strong>Sub-goals:</strong> {goal.subGoals.length}{" "}
        {goal.subGoals.length === 1 ? "sub-goal" : "sub-goals"}
      </p>
      <p className="mb-4">{goal.description}</p>
      <div className="mx-auto space-x-4">
        <button
          className="btn btn-error"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          onClick={handleButtonClick}
          className={`btn ${goal.status === "pending" ? "btn-primary" : "btn-success"}`}
        >
          {goal.status}
        </button>
      </div>
      {showModel && (
        <EditModel
          goal={goal}
          onClose={() => setShowModel(false)}
        />
      )}
    </div>
  );
};

export default GoalItem;

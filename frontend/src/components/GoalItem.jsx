import axios from "axios";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import EditModel from "./EditModel";

const GoalItem = ({ goal }) => {
  const [showModel, setShowModel] = useState(false);
  const handleButtonClick = (e) => {
    changeStatus();
  };

  const status = `${goal.status === "pending" && "completed"}`;

  const changeStatus = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/goal/changestatus",
        { goalId: goal._id, status },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = () => {
    deleteGoal();
  };

  const deleteGoal = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:8000/api/v1/goal/delete",
        { goalId: goal._id },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.data?.success) {
        toast.success(res.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white p-4 border rounded-lg">
      <div className="flex justify-end ">
        <div
          onClick={() => {
            setShowModel(true);
          }}
          className="bg-gray-200 p-3 rounded-full cursor-pointer"
        >
          <FaRegEdit className="flex justify-end" />
        </div>
      </div>
      <h5 className="text-xl font-bold mb-2">{goal.title}</h5>
      <p className="mb-2">
        <strong>Category:</strong> {goal.category}
      </p>
      <p className="mb-2">
        <strong>Duration:</strong> {goal.duration} days
      </p>
      <p>{goal.description}</p>
      <div className="mt-6">
        <button
          className="px-4 py-2 border-none bg-red-500 font-medium text-md mr-4"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 border-none bg-green-500 font-medium text-md mr-4"
        >
          {goal.status}
        </button>
      </div>
      {showModel && <EditModel goal={goal} onClose={() => {setShowModel(false)}}/>}
    </div>
  );
};

export default GoalItem;

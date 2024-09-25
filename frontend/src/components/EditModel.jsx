import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const EditModel = ({ onClose, goal }) => {
  const navigate = useNavigate();

  const [goalTitle, setGoalTitle] = useState(goal?.title || "");
  const [goalDescription, setGoalDescription] = useState(goal?.description || "");
  const [goalCategory, setGoalCategory] = useState(goal?.category || "");
  const [goalDuration, setGoalDuration] = useState(goal?.duration || "");

  useEffect(() => {
    console.log("Goal prop changed:", goal);
    if (goal) {
      setGoalTitle(goal.title || "");
      setGoalDescription(goal.description || "");
      setGoalCategory(goal.category || "");
      setGoalDuration(goal.duration || "");
    }
  }, [goal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedGoal = {
      title: goalTitle,
      description: goalDescription,
      category: goalCategory,
      duration: goalDuration,
      goalId: goal._id,  // Keep the goal's ID for backend reference
    };

    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/goal/edit",
        updatedGoal,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      if (res.data?.success) {
        toast.success(res.data?.message);
        navigate("/goals");  // Navigate to the Goals page after success
      }
    } catch (error) {
      console.error("Failed to update goal:", error);
      toast.error("Failed to update goal.");
    }
  };

  return (
    <div className="flex fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center m-auto bg-white h-fit p-8 rounded-lg">
        <div onClick={onClose} className="place-self-end mb-4 cursor-pointer">
          <RxCross2 size={30} />
        </div>
        <form key={goal?._id || 'new-goal'} className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            className="outline-none border-black border-2 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Description"
            value={goalDescription}
            onChange={(e) => setGoalDescription(e.target.value)}
            className="outline-none border-black border-2 p-2 rounded-md"
          />
          <select
            className="outline-none border-black border-2 p-2 rounded-md bg-white"
            value={goalCategory}
            onChange={(e) => setGoalCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Coding">Coding</option>
            <option value="Gaming">Gaming</option>
            <option value="Studying">Studying</option>
            <option value="Finance">Finance</option>
            <option value="Personal Development">Personal Development</option>
          </select>
          <input
            type="number"
            value={goalDuration}
            placeholder="Duration"
            onChange={(e) => setGoalDuration(e.target.value)}
            className="outline-none border-black border-2 p-2 rounded-md"
          />
          <button className="px-4 py-2 bg-green-400 rounded-md" type="submit">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModel;

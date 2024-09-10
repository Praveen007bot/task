import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const EditModel = ({ onClose, goal }) => {
    const navigate = useNavigate();
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalCategory, setGoalCategory] = useState("");
  const [goalDuration, setGoalDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGoal = {
      title: goalTitle,
      description: goalDescription,
      category: goalCategory,
      duration: goalDuration,
      goalId: goal._id,
    };

    try {
        const res = await axios.put(
          "http://localhost:8000/api/v1/goal/edit",
          newGoal,
          {
            headers: {
              "Content-type": "application/json",
            },
            withCredentials: true,
          }
        );
        if(res.data?.success){
          navigate('/Goals')
          toast.success(res.data?.message)
        }
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="flex fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center m-auto bg-white h-fit p-8 rounded-lg">
        <div onClick={onClose} className="place-self-end mb-4 cursor-pointer">
          <RxCross2 size={30} />
        </div>
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="title"
            value={goal.title}
            onChange={(e) => setGoalTitle(e.target.value)}
            className="outline-none border-black border-2 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="description"
            value={goal.description}
            className="outline-none border-black border-2 p-2 rounded-md"
            onChange={(e) => setGoalDescription(e.target.value)}
          />
          <select
            className="outline-none border-black border-2 p-2 rounded-md bg-white"
            value={goal.category}
            onChange={(e) => setGoalCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Coding">Coding</option>
            <option value="Gaming">Gaming</option>
            <option value="Studing">Studing</option>
            <option value="Finance">Finance</option>
            <option value="Personal Development">Personal Development</option>
          </select>
          <input
            type="number"
            value={goal.duration}
            placeholder="duration"
            className="outline-none border-black border-2 p-2 rounded-md"
            onChange={(e) => setGoalDuration(e.target.value)}
          />
          <button className="px-4 py-2 bg-green-400 rounded-md" type="submit">
            edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModel;

import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddGoals = () => {
  const navigate = useNavigate();

  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalCategory, setGoalCategory] = useState("");
  const [goalDuration, setGoalDuration] = useState("");


  const handleAddGoal = async (e) => {
    e.preventDefault();


    const newGoal = {
      title: goalTitle,
      description: goalDescription,
      category: goalCategory,
      duration: goalDuration,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/goal/add",
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


    setGoalTitle("");
    setGoalDescription("");
    setGoalCategory("");
    setGoalDuration("");
  };
  return (
    <>
      <Header />
      <section className="h-screen py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Add your Goal</h3>

          {/* Add Goal Form */}
          <form className="mb-8" onSubmit={handleAddGoal}>
            <div className="mb-4">
              <label className="block text-left mb-2 text-sm">Goal Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-left mb-2 text-sm">
                Goal Description
              </label>
              <textarea
                className="w-full p-2 border rounded"
                rows="4"
                value={goalDescription}
                onChange={(e) => setGoalDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-left mb-2 text-sm">Category</label>
              <select
                className="w-full p-2 border rounded"
                value={goalCategory}
                onChange={(e) => setGoalCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Coding">Coding</option>
                <option value="Gaming">Gaming</option>
                <option value="Studing">Studing</option>
                <option value="Finance">Finance</option>
                <option value="Personal Development">
                  Personal Development
                </option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-left mb-2 text-sm">
                Goal Duration (in Days)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={goalDuration}
                onChange={(e) => setGoalDuration(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded my-6"
            >
              Add Goal
            </button>
          </form>

        </div>
      </section>
    </>
  );
};

export default AddGoals;

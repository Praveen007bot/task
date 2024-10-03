import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../constants/api";

const AddGoals = () => {
  const navigate = useNavigate();

  // Main goal states
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalCategory, setGoalCategory] = useState("");
  const [goalTimer, setGoalTimer] = useState(0); // Timer state

  // Sub-goal states
  const [subGoals, setSubGoals] = useState([{ title: "", description: "" }]);

  // Handle sub-goal input changes
  const handleSubGoalChange = (index, field, value) => {
    const newSubGoals = [...subGoals];
    newSubGoals[index][field] = value;
    setSubGoals(newSubGoals);
  };

  // Add a new sub-goal
  const addSubGoal = () => {
    if (subGoals.length < 5) {
      const newSubGoals = [...subGoals, { title: "", description: "" }];
      setSubGoals(newSubGoals);
    }
  };

  // Remove a sub-goal
  const removeSubGoal = (index) => {
    const newSubGoals = subGoals.filter((_, i) => i !== index);
    setSubGoals(newSubGoals);
  };

  // Start timer function
  const startTimer = (duration) => {
    const timerDuration = duration * 60 * 1000; // Convert minutes to milliseconds
    setTimeout(() => {
      toast.success(`Timer for ${goalTitle} is complete! 🎉`);
    }, timerDuration);
  };

  // Handle form submission
  const handleAddGoal = async (e) => {
    e.preventDefault();

    // Check if sub-goals are filled
    const allSubGoalsFilled = subGoals.every(
      (subGoal) => subGoal.title.trim() !== "" && subGoal.description.trim() !== ""
    );

    if (!allSubGoalsFilled) {
      toast.error("Please fill all sub-goals before adding the main goal.");
      return;
    }

    const newGoal = {
      title: goalTitle,
      description: goalDescription,
      category: goalCategory,
      timer: goalTimer, // Include timer in the new goal
      subGoals,
    };

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/goal/add`,
        newGoal,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data?.success) {
        // Start the timer after successfully adding the goal
        startTimer(goalTimer);
        navigate("/Goals");
        toast.success(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }

    // Reset form
    setGoalTitle("");
    setGoalDescription("");
    setGoalCategory("");
    setGoalTimer(0); // Reset timer
    setSubGoals([{ title: "", description: "" }]);
  };

  return (
    <>
      <Header />
      <section className="h-screen py-16 bg-gray-900">
        <div className="container mx-auto text-center w-[40%]">
          <h3 className="text-4xl font-bold text-white mb-8">Add Your Goal</h3>

          {/* Add Goal Form */}
          <form
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            onSubmit={handleAddGoal}
          >
            {/* Goal Title */}
            <div className="mb-6">
              <label className="block text-left mb-2 text-sm text-gray-300">
                Goal Title
              </label>
              <input
                type="text"
                className="input input-bordered w-full text-white bg-gray-700"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                required
              />
            </div>

            {/* Goal Description */}
            <div className="mb-6">
              <label className="block text-left mb-2 text-sm text-gray-300">
                Goal Description
              </label>
              <textarea
                className="input input-bordered w-full text-white bg-gray-700"
                rows="4"
                value={goalDescription}
                onChange={(e) => setGoalDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-left mb-2 text-sm text-gray-300">
                Category
              </label>
              <select
                className="select select-bordered w-full bg-gray-700 text-white"
                value={goalCategory}
                onChange={(e) => setGoalCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Coding">Coding</option>
                <option value="Gaming">Gaming</option>
                <option value="Studying">Studying</option>
                <option value="Finance">Finance</option>
                <option value="Personal Development">
                  Personal Development
                </option>
              </select>
            </div>

            {/* Goal Timer */}
            <div className="mb-6">
              <label className="block text-left mb-2 text-sm text-gray-300">
                Goal Timer (in minutes)
              </label>
              <input
                type="number"
                className="input input-bordered w-full text-white bg-gray-700"
                value={goalTimer}
                onChange={(e) => setGoalTimer(e.target.value)}
                min={0}
                required
              />
            </div>

            {/* Sub-Goals Section */}
            <div className="mb-6">
              <label className="block text-left mb-2 text-sm text-gray-300">
                Sub Goals (Max 5)
              </label>
              {subGoals.map((subGoal, index) => (
                <div key={index} className="flex flex-col mb-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Sub-goal Title"
                      className="input input-bordered w-full mb-2 text-white bg-gray-700"
                      value={subGoal.title}
                      onChange={(e) =>
                        handleSubGoalChange(index, "title", e.target.value)
                      }
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-danger text-red-600"
                      onClick={() => removeSubGoal(index)}
                      disabled={subGoals.length === 1}
                    >
                      &times;
                    </button>
                  </div>
                  <textarea
                    placeholder="Sub-goal Description"
                    className="input input-bordered w-full mb-2 text-white bg-gray-700"
                    rows="2"
                    value={subGoal.description}
                    onChange={(e) =>
                      handleSubGoalChange(index, "description", e.target.value)
                    }
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary w-full bg-blue-600 text-white hover:bg-blue-500 mb-4"
                onClick={addSubGoal}
                disabled={subGoals.length >= 5}
              >
                Add Sub Goal
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-600 text-white hover:bg-blue-500"
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

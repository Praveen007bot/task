import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateGoal } from "../redux/goalSlice";
import { API_URL } from "../constants/api";

const EditModel = ({ goal, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [category, setCategory] = useState(goal.category);

  // List of categories for dynamic selection
  const categories = [
    "Coding",
    "Gaming",
    "Studying",
    "Finance",
    "Personal Development",
  ];

  const handleUpdateGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_URL}/api/v1/goal/edit`,
        { goalId: goal._id, title, description, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      console.log("Response from API:", res.data); // <-- log success response
  
      if (res.data?.success) {
        dispatch(updateGoal(res.data?.goal));
        toast.success(res.data.message);
        onClose();
      } else {
        toast.error("Failed to update goal. Try again.");
      }
    } catch (error) {
      console.error("Error updating goal:", error); // <-- log error
      toast.error(error.response?.data?.message || "Failed to update goal");
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Edit Goal</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleUpdateGoal}>
          <div className="mb-4">
            <label className="block text-sm text-gray-300">Goal Title</label>
            <input
              type="text"
              className="input input-bordered w-full text-white bg-gray-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300">Description</label>
            <textarea
              className="input input-bordered w-full text-white bg-gray-700"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300">Category</label>
            <select
              className="select select-bordered w-full bg-gray-700 text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-600 text-white hover:bg-blue-500"
            >
              Update Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModel;

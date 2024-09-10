import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch({ type: "RESET_STATE" });
        navigate("/login");
        console.log(res.data.message);
      }

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          User Profile
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium">
            Username
          </label>
          <div className="mt-1 p-2 bg-gray-100 rounded-md">
            {authUser?.username}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium">
            Email
          </label>
          <div className="mt-1 p-2 bg-gray-100 rounded-md">
            {authUser?.email}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

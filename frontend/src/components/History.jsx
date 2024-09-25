import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { FaTrash } from "react-icons/fa"; // Import the delete icon
import toast from "react-hot-toast";

const History = () => {
  const [goals, setGoals] = useState([]);

  const getCompletedGoals = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/goal/", {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      setGoals(res?.data?.goals);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      const res = await axios.request({
        method: "DELETE",
        url: "http://localhost:8000/api/v1/goal/delete",
        data: { goalId }, // Pass goalId in request body
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data?.success) {
        setGoals(goals.filter(goal => goal._id !== goalId)); // Remove deleted goal from state
        toast.success(res.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getCompletedGoals();
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="font-bold text-4xl mb-10">History</div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Goal Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Goal Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Subgoals
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => (
                <React.Fragment key={goal._id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {goal.title}
                    </th>
                    <td className="px-6 py-4">{goal.description}</td>
                    <td className="px-6 py-4">{goal.category}</td>
                    <td className="px-6 py-4">{goal.duration} days</td>
                    <td className="px-6 py-4">{goal.status}</td>
                    <td className="px-6 py-4">
                      {/* Displaying subgoals */}
                      <ul className="list-disc list-inside">
                        {goal.subGoals?.length > 0 ? (
                          goal.subGoals.map((subgoal) => (
                            <li key={subgoal._id} className="text-gray-700 dark:text-gray-300">
                              {subgoal.title}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-700 dark:text-gray-300">No subgoals</li>
                        )}
                      </ul>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteGoal(goal._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default History;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const History = () => {
  const [goal, setGoal] = useState([]);
  const getCompletedGoals = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/goal/", {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res?.data?.goals);
      setGoal(res?.data?.goals);
    } catch (error) {
      console.log(error);
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

        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Gole title
                </th>
                <th scope="col" class="px-6 py-3">
                  goal description
                </th>
                <th scope="col" class="px-6 py-3">
                  category
                </th>
                <th scope="col" class="px-6 py-3">
                  duration
                </th>
                <th scope="col" class="px-6 py-3">
                  status
                </th>
              </tr>
            </thead>
            <tbody>
              {goal.map((goal) => (
                <>
                  <tr
                    key={goal._id}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {goal.title}
                    </th>
                    <td class="px-6 py-4">{goal.description}</td>
                    <td class="px-6 py-4">{goal.category}</td>
                    <td class="px-6 py-4">{goal.duration}</td>
                    <td class="px-6 py-4">{goal.status}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default History;

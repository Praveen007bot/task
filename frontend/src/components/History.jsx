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
        <table className="border-2 border-black w-[50%]">
          <tr className="flex justify-between items-center px-4 text-xl border-b-2 border-black">
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
          {goal.map((goal) => (
            <tr
              key={goal._id}
              className="flex items-center justify-between px-4"
            >
              <td>{goal.title}</td>
              <td>{goal.description}</td>
              <td>{goal.status}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default History;

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getAllGoals = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGoals();
  }, [users]);

  const calculateTotalGoals = (user) => {
    return user.goals.length;
  };

  return (
    <div className="flex">
      <div className="w-[16%]">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold">Users</h1>

        <div class="relative overflow-x-auto mt-10">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  email
                </th>
                <th scope="col" class="px-6 py-3">
                  username
                </th>
                <th scope="col" class="px-6 py-3">
                  total goals
                </th>
                <th scope="col" class="px-6 py-3">
                  status
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.email}
                    </th>
                    <td class="px-6 py-4">{user.username}</td>
                    <td class="px-6 py-4">{calculateTotalGoals(user)}</td>
                    <td class="px-6 py-4">active</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

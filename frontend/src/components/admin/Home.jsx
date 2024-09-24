import React from "react";
import Sidebar from "./Sidebar/Sidebar";

const AdminHome = () => {
  return (
    <div className="flex ">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div></div>
    </div>
  );
};

export default AdminHome;

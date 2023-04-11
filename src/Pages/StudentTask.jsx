import React from "react";
import Sidebar from "../Components/Bars/Sidebar";
import Topbar from "../Components/Bars/Topbar";
import Task_Submission from "../Components/Task_Submission/Task_Submission";
// -------------------
const StudentTask = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Task_Submission />
      </main>
    </div>
  );
};

export default StudentTask;

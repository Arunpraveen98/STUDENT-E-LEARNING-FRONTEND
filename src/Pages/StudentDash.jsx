import React from "react";
import Sidebar from "../Components/Bars/Sidebar";
import Topbar from "../Components/Bars/Topbar";
import Tasks_Dashboard from "../Components/Charts_Dash/Tasks_Dashboard";
// -------------------
const StudentDash = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Tasks_Dashboard />
      </main>
    </div>
  );
};

export default StudentDash;

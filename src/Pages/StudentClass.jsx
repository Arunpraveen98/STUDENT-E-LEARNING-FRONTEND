import React from "react";
import Sidebar from "../Components/Bars/Sidebar";
import Topbar from "../Components/Bars/Topbar";
import Class from "../Components/Classes/Class";
// -------------------
const StudentClass = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Class />
      </main>
    </div>
  );
};

export default StudentClass;

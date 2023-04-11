import React from "react";
import Sidebar from "../Components/Bars/Sidebar";
import Topbar from "../Components/Bars/Topbar";
import Free_Courses from "../Components/Courses/Free_Course";
// -------------------
const StudentCourse = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Free_Courses />
      </main>
    </div>
  );
};

export default StudentCourse;

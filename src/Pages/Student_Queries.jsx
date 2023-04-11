import React from "react";
import Sidebar from "../Components/Bars/Sidebar";
import Topbar from "../Components/Bars/Topbar";
import Queries from "../Components/Queries/Queries";
// -------------------
const Student_Queries = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Queries />
      </main>
    </div>
  );
};

export default Student_Queries;

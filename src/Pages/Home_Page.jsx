import React from "react";
import Sidebar from "../Components/Bars/Sidebar";
import Topbar from "../Components/Bars/Topbar";
import Home from "../Components/Home/Home";
// -------------------
const Home_Page = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Home />
      </main>
    </div>
  );
};

export default Home_Page;

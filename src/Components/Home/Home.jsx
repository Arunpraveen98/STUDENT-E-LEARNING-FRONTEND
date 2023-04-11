import React from "react";
import "./Home.css";
import Dash_Card from "../Charts_Dash/Dash_Card";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { AssignmentLate, FeaturedVideo } from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
//   ------------------------
const Home = () => {
  return (
    <div className="container">
      <div className="row">
        {/* ------------------------ */}
        <div className="col-md-12">
          <div className="row">
            {/* ------------------------ */}
            <Dash_Card
              Title="Total Classes"
              Amount="10 Classes"
              CardLeftColor="primary"
              CardTextColor="primary"
              icons={
                <AccountBoxIcon style={{ width: "30px", height: "28px" }} />
              }
            />
            {/* ------------------------ */}
            <Dash_Card
              Title="Free Courses"
              Amount="8 Videos"
              CardLeftColor="success"
              CardTextColor="success"
              icons={
                <FeaturedVideo style={{ width: "30px", height: "28px" }} />
              }
            />
            {/* ------------------------ */}
            <Dash_Card
              Title="Daily Tasks"
              Amount="10 Tasks"
              CardLeftColor="info"
              CardTextColor="info"
              icons={
                <AssignmentIcon style={{ width: "30px", height: "28px" }} />
              }
            />
            {/* ------------------------ */}
            <Dash_Card
              Title="Queries"
              Amount={"Accessibile"}
              CardLeftColor="warning"
              CardTextColor="warning"
              icons={
                <AssignmentLate style={{ width: "30px", height: "28px" }} />
              }
            />
            {/* ------------------------ */}
          </div>
          {/* End of content Row... */}
          {/* ---------------------------------- */}
        </div>
        {/* ------------------------ */}
        <div className="col-md-12">
          <div className="card text-center">
            {/* ------------------------ */}
            <div className="card-body">
              {/* ------------------------ */}
              <h5 className="card-title home-title">
                Welcome to Student E-Learning App
              </h5>
              {/* ------------------------ */}
              <div className="card-body home-content">
                <div className="home-content-text">
                  💠 Empower Your Learning Journey with MERN Stack.
                </div>
                <div className="home-content-text">
                  💠 Attend Daily Classes and Interact with Expert Instructors.
                </div>
                <div className="home-content-text">
                  💠 Complete Daily Tasks and Track Your Progress.
                </div>
                <div className="home-content-text">
                  💠 Access Basic Video Courses on a Wide Range of Topics.
                </div>
                <div className="home-content-text">
                  💠 Raise Queries for Doubts and Get Prompt Assistance.
                </div>
              </div>
              {/* ------------------------ */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { AssignmentLate, FeaturedVideo } from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";
import TaskCompletionBarChart from "./Dash_Chart";
import Dash_Card from "./Dash_Card";
// ------------------------------

const Tasks_Dashboard = () => {
  // ------------------------------
  //? React Hooks...
  const [Submitted_Task, setSubmitted_Task] = useState([]);
  const [Loader, setLoader] = useState(true);
  // ------------------------------
  //? React-router-dom Hook...
  const navigate = useNavigate();
  // ------------------------------
  //? Student Object...
  const Student = window.localStorage.getItem("Student_Data");
  const Student_Data = JSON.parse(Student);
  // ------------------------------
  //? On Initial Mounting Fetching Submitted Tasks Data ...
  const Get_Submitted_Task = async () => {
    try {
      const Get_Task_Data = await axios.get(
        `${process.env.REACT_APP_EXPRESS_SERVER}/Submitted-Task?Email=${Student_Data.Student_Email}`,
        // `http://localhost:8000/Submitted-Task?Email=${Student_Data.Student_Email}`,
        {
          headers: {
            Authorization: Student_Data.Student_Token,
          },
        }
      );
      //  -----------------------------------------
      setSubmitted_Task(Get_Task_Data.data);
      setLoader(false);
      //  -----------------------------------------
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  //  -----------------------------------------
  //? UseEffect on Initial Mounting...
  useEffect(() => {
    Get_Submitted_Task();
  }, []);
  //  -----------------------------------------
  return (
    <div className="container">
      {Loader ? (
        <div className="col-md-12">
          <div className="loader-div">
            <div className="loader">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
              <div className="bar4"></div>
              <div className="bar5"></div>
              <div className="bar6"></div>
              <div className="bar7"></div>
              <div className="bar8"></div>
              <div className="bar9"></div>
              <div className="bar10"></div>
              <div className="bar11"></div>
              <div className="bar12"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            {/* ------------------------- */}
            <div className="col-md-12">
              <div className="row">
                {/* ------------------------- */}
                <Dash_Card
                  Title="Total Classes"
                  Amount="10"
                  CardLeftColor="primary"
                  CardTextColor="primary"
                  icons={
                    <AccountBoxIcon style={{ width: "30px", height: "28px" }} />
                  }
                />
                {/* ------------------------- */}
                <Dash_Card
                  Title="Free Courses"
                  Amount="8"
                  CardLeftColor="success"
                  CardTextColor="success"
                  icons={
                    <FeaturedVideo style={{ width: "30px", height: "28px" }} />
                  }
                />
                {/* ------------------------- */}
                <Dash_Card
                  Title="Daily Tasks"
                  Amount="10"
                  CardLeftColor="info"
                  CardTextColor="info"
                  icons={
                    <AssignmentIcon style={{ width: "30px", height: "28px" }} />
                  }
                />
                {/* ------------------------- */}
                <Dash_Card
                  Title="Pending Tasks"
                  Amount={10 - Submitted_Task.length}
                  CardLeftColor="warning"
                  CardTextColor="warning"
                  icons={
                    <AssignmentLate style={{ width: "30px", height: "28px" }} />
                  }
                />
                {/* ------------------------- */}
              </div>
              {/* End of content Row... */}
              {/* ------------------------- */}
            </div>
            {/* END of content Column */}
            {/* ------------------------- */}
          </div>
          <div className="row">
            {/*BAR Chart*/}
            <TaskCompletionBarChart/>
          </div>
        </>
      )}
    </div>
  );
};

export default Tasks_Dashboard;

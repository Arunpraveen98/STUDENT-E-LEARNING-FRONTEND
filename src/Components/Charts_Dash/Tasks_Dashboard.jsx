import axios from "axios";
import React, { useEffect, useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  AssignmentLate,
  FeaturedVideo,
} from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";
import TaskCompletionBarChart from "./Dash_Chart";
import Dash_Card from "./Dash_Card";

const Tasks_Dashboard = () => {
  const [Submitted_Task, setSubmitted_Task] = useState([]);
  const [Task_value, setTask_value] = useState("");
  const navigate = useNavigate();
  const Student = window.localStorage.getItem("Student_Data");
  const Student_Data = JSON.parse(Student);
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
      // console.log(Get_Task_Data.data[0].Task_Completed);
      setSubmitted_Task(Get_Task_Data.data);
      setTask_value(Get_Task_Data.data[0].Task_Completed);
      // console.log(Get_Task_Data.data[0].Task_Completed);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  //  -----------------------------------------
  useEffect(() => {
    Get_Submitted_Task();
  }, []);
  //  -----------------------------------------
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <Dash_Card
              Title="Total Classes"
              Amount="10"
              CardLeftColor="primary"
              CardTextColor="primary"
              icons={
                <AccountBoxIcon style={{ width: "30px", height: "28px" }} />
              }
            />
            <Dash_Card
              Title="Free Courses"
              Amount="8"
              CardLeftColor="success"
              CardTextColor="success"
              icons={
                <FeaturedVideo style={{ width: "30px", height: "28px" }} />
              }
            />
            <Dash_Card
              Title="Daily Tasks"
              Amount="10"
              CardLeftColor="info"
              CardTextColor="info"
              icons={
                <AssignmentIcon style={{ width: "30px", height: "28px" }} />
              }
            />
            <Dash_Card
              Title="Pending Tasks"
              Amount={10 - Submitted_Task.length}
              CardLeftColor="warning"
              CardTextColor="warning"
              icons={
                <AssignmentLate style={{ width: "30px", height: "28px" }} />
              }
            />
          </div>

          {/* End of content Row... */}
          {/* -------------------------------------------------------- */}
        </div>
      </div>
      <div className="row">
        {/*Chart*/}
        <TaskCompletionBarChart Task_Completed={Task_value} />
      </div>
      {/* -------------------------------------------------------- */}
    </div>
  );
};

export default Tasks_Dashboard;
